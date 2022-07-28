
const serverless = require('serverless-http');
const { createExpressApp } = require('../../modules');
const express = require('express');
const { prisma } = require('../../prisma');


const getEventsExtraData = async (req, res) => {
    try {
        const ids = req.body.ids ?? []

        const comments = await prisma.postComment.findMany({
            where: {
                nostr_id: {
                    in: ids
                }
            },
            select: {
                id: true,
                nostr_id: true,
                votes_count: true,
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        name: true,
                    }
                }
            }
        });

        return res
            .status(200)
            .json(comments)
    } catch (error) {
        console.log(error);
        res.status(500).send("Unexpected error happened, please try again")
    }

}


let app;

if (process.env.LOCAL) {
    app = createExpressApp()
    app.post('/nostr-events-extra-data', getEventsExtraData);
}
else {
    const router = express.Router();
    router.post('/nostr-events-extra-data', getEventsExtraData)
    app = createExpressApp(router)
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
