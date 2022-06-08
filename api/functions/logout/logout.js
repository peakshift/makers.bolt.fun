const serverless = require('serverless-http');
const { createExpressApp } = require('../../modules');
const express = require('express');

const logoutHandler = (req, res, next) => {
    if (req.user) {
        req.session.destroy();
        return res.redirect("/");
    }
    next();
};

let app;

if (process.env.NETLIFY) {
    const router = express.Router();
    router.get('/login', logoutHandler)
    app = createExpressApp(router)
}
else {
    app = createExpressApp()
    app.get('/login', logoutHandler);
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
