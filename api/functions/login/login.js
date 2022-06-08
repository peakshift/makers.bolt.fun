
const { prisma } = require('../../prisma');
const LnurlService = require('../../auth/services/lnurl.service')
const serverless = require('serverless-http');
const { getSidByK1 } = require('../../auth/services/lnurl.service');
const { sessionsStore, createExpressApp } = require('../../modules');
const express = require('express');


const loginHandler = async (req, res) => {
    const { tag, k1, sig, key } = req.query;
    // Generate an auth URL
    if (!sig || !key) {

        const data = await LnurlService.generateAuthUrl(req.sessionID);
        return res.status(200).json(data);
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


            // Update the session with the secret
            const sid = await getSidByK1(k1);
            const d = await new Promise((res, rej) => {
                sessionsStore.get(sid, (err, d) => {
                    if (err) rej(err);
                    res(d)
                })
            });
            // console.log(d);
            await new Promise((res, rej) => {
                sessionsStore.set(sid, { ...d, lnurlAuth: { linkingPublicKey: key } }, (err) => {
                    if (err) rej(err);
                    res()
                })
            });


            LnurlService.removeHash(LnurlService.createHash(k1)).catch();
            LnurlService.removeExpiredHashes().catch();

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
