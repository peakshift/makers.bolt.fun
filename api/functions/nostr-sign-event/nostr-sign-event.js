
const serverless = require('serverless-http');
const { createExpressApp } = require('../../modules');
const express = require('express');
const extractUserFromCookie = require('../../utils/extractUserFromCookie');
const { getUserById } = require('../../auth/utils/helperFuncs');
const { generatePrivateKey, getPublicKey, signEvent: signNostrEvent } = require('../../utils/nostr-tools');
const { prisma } = require('../../prisma');


const signEvent = async (req, res) => {
    try {
        const userPayload = await extractUserFromCookie(req.headers.cookie ?? req.headers.Cookie)
        const user = await getUserById(userPayload.id);

        if (!user)
            return res.status(401).json({ status: 'ERROR', reason: 'Not Authenticated' });

        let prvkey = user.nostr_prv_key, pubkey = user.nostr_pub_key;

        if (!prvkey) {
            prvkey = generatePrivateKey();
            pubkey = getPublicKey(prvkey);

            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    nostr_prv_key: prvkey,
                    nostr_pub_key: pubkey
                }
            })
        }

        const { content, tags, kind = 1 } = req.body.event
        const event = {
            kind,
            pubkey,
            content,
            tags,
            created_at: Math.round(Date.now() / 1000),
        }

        event.sig = await signNostrEvent(event, prvkey);

        return res
            .status(200)
            .json({ event });
    } catch (error) {
        console.log(error);
        res.status(500).send("Unexpected error happened, please try again")
    }

}


let app;

if (process.env.LOCAL) {
    app = createExpressApp()
    app.post('/nostr-sign-event', signEvent);
}
else {
    const router = express.Router();
    router.post('/nostr-sign-event', signEvent)
    app = createExpressApp(router)
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
