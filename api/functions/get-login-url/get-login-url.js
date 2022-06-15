
const LnurlAuthService = require('../../auth/services/lnurlAuth.service')
const serverless = require('serverless-http');
const { createExpressApp } = require('../../modules');
const express = require('express');
const jose = require('jose');
const { JWT_SECRET } = require('../../utils/consts');





const getLoginUrl = async (req, res) => {
    try {
        const data = await LnurlAuthService.generateAuthUrl();

        const session_token = await new jose.SignJWT({ hash: data.secretHash })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('5min')
            .sign(Buffer.from(JWT_SECRET, 'utf-8'))

        return res
            .status(200)
            .json({ ...data, session_token });
    } catch (error) {
        console.log(error);
        res.status(500).send("Unexpected error happened, please try again")
    }

}


let app;

if (process.env.LOCAL) {
    app = createExpressApp()
    app.get('/get-login-url', getLoginUrl);
}
else {
    const router = express.Router();
    router.get('/get-login-url', getLoginUrl)
    app = createExpressApp(router)
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
