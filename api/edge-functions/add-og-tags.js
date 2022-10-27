

const handler = async (request, context) => {

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

    const metaData = await fetch(url.origin + `/.netlify/functions/get-story-metadata?id=${id}`)
        .then(res => res.json())
        .catch(console.log);




    const ogTitleRgx = /<meta +property="og:title" +content="([^"]+)" +data-react-helmet="true" *\/>/gm
    const ogDescRgx = /<meta +property="og:description" +content="([^"]+)" +data-react-helmet="true" *\/>/gm
    const ogImgRgx = /<meta +property="og:image" +content="([^"]+)" +data-react-helmet="true" *\/>/gm



    // Replace the content
    const updatedPage = page
        .replace(ogTitleRgx, `<meta property="og:title" content="${metaData.title}" data-react-helmet="true" />`)
        .replace(ogDescRgx, `<meta property="og:description" content="${metaData.description}" data-react-helmet="true" />`)
        .replace(ogImgRgx, `<meta property="og:image" content="${metaData.image}" data-react-helmet="true" />`)

    return new Response(updatedPage, response);
};

export default handler;