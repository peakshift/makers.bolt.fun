

const handler = async (request, context) => {

    // Just return what was requested without transforming it, 
    // unless we fnd the query parameter for this demo
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/story/')) {
        return;
    }

    console.log(url);

    const slug = url.pathname.slice(url.pathname.indexOf('/story/') + 7);

    const id = Number(slug?.includes('--') ? slug.slice(slug.lastIndexOf('--') + 2) : undefined)

    if (Number.isNaN(id)) return;

    // Get the page content
    const response = await context.next();
    const page = await response.text();

    const metaData = await fetch(url.origin + `/.netlify/functions/get-story-metadata?id=${id}`)
        .then(res => res.json())
        .catch(console.log);

    console.log(metaData);


    // Search for the placeholder
    const regex = /"__META_DATA_PLACEHOLDER__"/;



    // Replace the content
    const updatedPage = page.replace(regex, JSON.stringify(metaData));
    console.log(updatedPage);
    return new Response(updatedPage, response);
};

export default handler;