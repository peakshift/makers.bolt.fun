
// const { prisma } = require('../prisma')
// const { resolveImgObjectToUrl } = require("../utils/resolveImageUrl")

import { prisma } from "../prisma";

const handler = async (request, context) => {

    // Just return what was requested without transforming it, 
    // unless we fnd the query parameter for this demo
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/story/')) {
        return;
    }

    const slug = url.pathname.slice(url.pathname.indexOf('/story/') + 7);

    const id = Number(slug?.includes('--') ? slug.slice(slug.lastIndexOf('--') + 2) : undefined)

    if (Number.isNaN(id)) return;

    // Get the page content
    const response = await context.next();
    const page = await response.text();

    const storyData = await prisma.story.findUnique({
        where: { id }, select: {
            title: true,
            excerpt: true,
            cover_image_rel: true,
        }
    })

    // Search for the placeholder
    const regex = /"__META_DATA_PLACEHOLDER__"/;

    const metaData = {
        title: storyData.title,
        description: storyData.excerpt,
        // image: resolveImgObjectToUrl(storyData.cover_image_rel),
    }


    // Replace the content
    const updatedPage = page.replace(regex, JSON.stringify(metaData));
    console.log(updatedPage);
    return new Response(updatedPage, response);
};

export default handler;