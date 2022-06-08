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

if (process.env.LOCAL) {
    app = createExpressApp()
    app.get('/login', logoutHandler);
}
else {
    const router = express.Router();
    router.get('/login', logoutHandler)
    app = createExpressApp(router)
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
