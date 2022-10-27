
const serverless = require('serverless-http');
const { createExpressApp } = require('../../modules');
const express = require('express');
const { prisma } = require('../../prisma');
const { resolveImgObjectToUrl } = require('../../utils/resolveImageUrl');


const getObjectMetadata = async (req, res) => {

    const { storyId, projectTag } = req.query;
    // return res.status(400).send("No Id provided");
    try {
        if (!Number.isNaN(Number(storyId))) {
            const story = await prisma.story.findUnique({ where: { id: Number(storyId) }, select: { title: true, excerpt: true, cover_image_rel: true } });
            return res
                .status(200)
                .json({ title: story.title, description: story.excerpt, image: resolveImgObjectToUrl(story.cover_image_rel) });
        }

        if (projectTag) {
            const project = await prisma.project.findFirst({ where: { hashtag: projectTag }, select: { title: true, description: true, cover_image_rel: true } })
            return res
                .status(200)
                .json({ title: project.title, description: project.excerpt, image: resolveImgObjectToUrl(project.cover_image_rel) });
        }

        return res.status(400).send("No valid object identifier detected")
    } catch (error) {
        res.status(500).send("Unexpected error happened, please try again")
    }

}


let app;

if (process.env.LOCAL) {
    app = createExpressApp()
    app.get('/get-object-metadata', getObjectMetadata);
}
else {
    const router = express.Router();
    router.get('/get-object-metadata', getObjectMetadata)
    app = createExpressApp(router)
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
