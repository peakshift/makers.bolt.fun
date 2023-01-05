

const handler = async (request, context) => {

    const url = new URL(request.url);
    if (!url.pathname.startsWith('/project/')) {
        return;
    }

    const tag = url.pathname.slice(url.pathname.indexOf('/project/') + 9);

    // Get the page content
    const response = await context.next();
    const page = await response.text();

    const metaData = await fetch(url.origin + `/.netlify/functions/get-object-metadata?projectTag=${tag}`)
        .then(res => res.json())
        .catch();


    const ogTitleRgx = /<meta +property="og:title" +content="([^"]+)" +data-react-helmet="true" *\/>/gm
    const ogDescRgx = /<meta +property="og:description" +content="([^"]+)" +data-react-helmet="true" *\/>/gm
    const ogImgRgx = /<meta +property="og:image" +content="([^"]+)" +data-react-helmet="true" *\/>/gm



    // Replace the content 

    let updatedPage = page;
    if (metaData.title) updatedPage = updatedPage.replace(ogTitleRgx, `<meta property="og:title" content="${metaData.title}" data-react-helmet="true" />`)
    if (metaData.description) updatedPage = updatedPage.replace(ogDescRgx, `<meta property="og:description" content="${metaData.description}" data-react-helmet="true" />`)
    if (metaData.image) updatedPage = updatedPage.replace(ogImgRgx, `<meta property="og:image" content="${metaData.image}" data-react-helmet="true" />`)


    return new Response(updatedPage, response);
};

export default handler;