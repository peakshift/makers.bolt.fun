
const serverless = require('serverless-http');
const { createExpressApp } = require('../../modules');
const express = require('express');
const { prisma } = require('../../prisma');
const { resolveImgObjectToUrl } = require('../../utils/resolveImageUrl');


const getStoryMetadata = async (req, res) => {

    const { id } = req.query;
    if (Number.isNaN(id))
        return res.status(400).send("No Id provided");

    try {
        const story = await prisma.story.findUnique({ where: { id: Number(id) }, select: { title: true, excerpt: true, cover_image_rel: true } });

        return res
            .status(200)
            .json({ title: story.title, description: story.excerpt, image: resolveImgObjectToUrl(story.cover_image_rel) });
    } catch (error) {
        res.status(500).send("Unexpected error happened, please try again")
    }

}


let app;

if (process.env.LOCAL) {
    app = createExpressApp()
    app.get('/get-story-metadata', getStoryMetadata);
}
else {
    const router = express.Router();
    router.get('/get-story-metadata', getStoryMetadata)
    app = createExpressApp(router)
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
