
const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');

const createExpressApp = (router) => {

    const app = express();
    const routerBasePath = process.env.LOCAL ? `/dev` : `/.netlify/functions`

    app.use(cookieParser());
    app.use(cors({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
    }))

    if (router)
        app.use(routerBasePath, router);

    return app;
}


module.exports = createExpressApp;