
const serverless = require('serverless-http');
const { createExpressApp } = require('../../modules');
const express = require('express');
const { prisma } = require('../../prisma');


const mapPubkeysToUsers = async (req, res) => {
    try {

        const pubkeys = req.body.pubkeys ?? [];

        const usersArr = await prisma.user.findMany({
            where: {
                nostr_pub_key: {
                    in: pubkeys
                }
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                nostr_pub_key: true,
                lightning_address: true
            }
        })

        let pubkeysToUsers = {}
        usersArr.forEach(user => {
            pubkeysToUsers[user.nostr_pub_key] = user;
        });

        return res
            .status(200)
            .json({ pubkeysToUsers });
    } catch (error) {
        console.log(error);
        res.status(500).send("Unexpected error happened, please try again")
    }

}


let app;

if (process.env.LOCAL) {
    app = createExpressApp()
    app.post('/pubkeys-to-users', mapPubkeysToUsers);
}
else {
    const router = express.Router();
    router.post('/pubkeys-to-users', mapPubkeysToUsers)
    app = createExpressApp(router)
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
