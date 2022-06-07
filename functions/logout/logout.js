const serverless = require('serverless-http');
const { createExpressApp } = require('../utils/express-app');
const app = createExpressApp();

app.get('/logout', (req, res, next) => {
    if (req.user) {
        req.session.destroy();
        return res.redirect("/");
    }
    next();
})

const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};