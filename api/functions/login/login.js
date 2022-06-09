
const { prisma } = require('../../prisma');
const LnurlService = require('../../auth/services/lnurl.service')
const serverless = require('serverless-http');
const { getAuthTokenByHash, createHash, associateTokenToHash } = require('../../auth/services/lnurl.service');
const { sessionsStore, createExpressApp } = require('../../modules');
const express = require('express');
const jose = require('jose');
const { JWT_SECRET } = require('../../utils/consts');



const router = express.Router();
router.get('/login', (req, res) => {
    res.cookie('login_session', 'value', {
        maxAge: 1000 * 60 * 2, // 2 mins
        secure: true,
        httpOnly: true,
    })
})

const loginHandler = async (req, res) => {
    const { tag, k1, sig, key } = req.query;
    // Generate an auth URL
    if (!sig || !key) {
        const data = await LnurlService.generateAuthUrl();
        const maxAge = 1000 * 60 * 3; //2 mins

        const jwt = await new jose.SignJWT({ hash: data.secretHash })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('5min')
            .sign(Buffer.from(JWT_SECRET, 'utf-8'))

        return res
            .status(200)
            .cookie('login_session', jwt, {
                maxAge,
                secure: true,
                httpOnly: true,
            })
            .json(data);
    }
    else {
        if (tag !== 'login')
            return res.status(400).send("Invalid tag provided")

        // Verify login params 
        try {
            await LnurlService.verifySig(sig, k1, key)
        } catch (error) {
            return res.status(400).json({ status: 'ERROR', reason: 'Invalid Signature' })

        }


        try {
            //Create user if not already existing
            const user = await prisma.user.findFirst({ where: { pubKey: key } })
            if (user === null) {
                await prisma.user.create({
                    data: {
                        pubKey: key,
                        name: key,
                        avatar: `https://avatars.dicebear.com/api/bottts/${key}.svg`
                    }
                })
            }

            // calc the hash of k1
            const hash = createHash(k1);

            // generate the auth jwt token
            const hour = 3600000
            const maxAge = 30 * 24 * hour;

            const jwt = await new jose.SignJWT({ pubKey: key })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime(maxAge)
                //TODO: Set audience, issuer
                .sign(Buffer.from(JWT_SECRET, 'utf-8'))

            // associate the auth token with the hash in the db
            console.log(hash);
            await associateTokenToHash(hash, jwt);

            // LnurlService.removeHash(LnurlService.createHash(k1)).catch();
            // LnurlService.removeExpiredHashes().catch();

            return res.status(200).json({ status: "OK" })

        } catch (error) {
            console.log(error);
            return res.status(200).json({ status: 'ERROR', reason: 'Unexpected error happened, please try again' })
        }
    }
}


let app;

if (process.env.LOCAL) {
    app = createExpressApp()
    app.get('/login', loginHandler);
}
else {
    const router = express.Router();
    router.get('/login', loginHandler)
    app = createExpressApp(router)
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
