
const { prisma } = require('../../prisma');
const LnurlAuthService = require('../../auth/services/lnurlAuth.service')
const serverless = require('serverless-http');
const { createHash, associateTokenToHash } = require('../../auth/services/lnurlAuth.service');
const { createExpressApp } = require('../../modules');
const express = require('express');
const jose = require('jose');
const { JWT_SECRET } = require('../../utils/consts');
const { generatePrivateKey, getPublicKey } = require('../../utils/nostr-tools');



const loginHandler = async (req, res) => {
    const { tag, k1, sig, key } = req.query;

    if (tag !== 'login')
        return res.status(400).json({ status: 'ERROR', reason: 'Invalid Tag Provided' })
    // Verify login params 
    try {
        await LnurlAuthService.verifySig(sig, k1, key)
    } catch (error) {
        return res.status(400).json({ status: 'ERROR', reason: 'Invalid Signature' })

    }


    try {
        //Create user if not already existing
        const user = await prisma.user.findFirst({ where: { pubKey: key } })
        if (user === null) {

            const nostr_prv_key = generatePrivateKey();
            const nostr_pub_key = getPublicKey(nostr_prv_key);

            await prisma.user.create({
                data: {
                    pubKey: key,
                    name: key,
                    avatar: `https://avatars.dicebear.com/api/bottts/${key}.svg`,
                    nostr_prv_key,
                    nostr_pub_key,
                }
            })
        }

        // calc the hash of k1
        const hash = createHash(k1);

        // generate the auth jwt token
        const hour = 3600000
        const maxAge = 30 * 24 * hour;

        const authToken = await new jose.SignJWT({ pubKey: key })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(maxAge)
            //TODO: Set audience, issuer
            .sign(Buffer.from(JWT_SECRET, 'utf-8'))

        // associate the auth token with the hash in the db
        await associateTokenToHash(hash, authToken);


        return res.status(200).json({ status: "OK" })

    } catch (error) {
        return res.status(400).json({ status: 'ERROR', reason: 'Unexpected error happened, please try again' })
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
