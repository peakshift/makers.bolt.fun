
const LnurlAuthService = require('../../auth/services/lnurlAuth.service')
const serverless = require('serverless-http');
const { createExpressApp } = require('../../modules');
const express = require('express');
const jose = require('jose');
const { JWT_SECRET } = require('../../utils/consts');
const extractUserFromCookie = require('../../utils/extractUserFromCookie');
const { getUserById } = require('../../auth/utils/helperFuncs');





const getLoginUrl = async (req, res) => {

    const { action } = req.query;

    try {

        let user_token = null;
        if (action === 'link') {
            const userPayload = await extractUserFromCookie(req.headers.cookie ?? req.headers.Cookie)
            const user = await getUserById(userPayload.id);

            if (!user)
                return res.status(400).json({ status: 'ERROR', reason: 'Only authenticated user can request a linking URL' });

            user_token = await new jose.SignJWT({ user_id: user.id })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('5min')
                .sign(Buffer.from(JWT_SECRET, 'utf-8'))
        }

        const data = await LnurlAuthService.generateAuthUrl({ user_token });

        const session_token = await new jose.SignJWT({ hash: data.secretHash })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('5min')
            .sign(Buffer.from(JWT_SECRET, 'utf-8'))

        return res
            .status(200)
            .json({ ...data, session_token });
    } catch (error) {
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
