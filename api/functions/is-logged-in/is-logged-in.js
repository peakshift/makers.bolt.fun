
const serverless = require('serverless-http');
const { createExpressApp } = require('../../modules');
const express = require('express');
const jose = require('jose');
const { JWT_SECRET } = require('../../utils/consts');
const lnurlAuthService = require('../../auth/services/lnurlAuth.service');


const isLoggedInHandler = async (req, res) => {
    try {
        const login_session = req.headers.session_token;
        if (login_session) {
            const { payload } = await jose.jwtVerify(login_session, Buffer.from(JWT_SECRET), {
                algorithms: ['HS256'],
            });
            const hash = payload.hash;
            console.log(hash);
            const authToken = await lnurlAuthService.getAuthTokenByHash(hash);
            if (!authToken)
                throw new Error("Not logged in yet")

            lnurlAuthService.removeHash(hash).catch();
            lnurlAuthService.removeExpiredHashes().catch();

            res
                .status(200)
                .clearCookie('login_session', {
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                })
                .cookie('Authorization', authToken, {
                    maxAge: 3600000 * 24 * 30,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                })
                .json({
                    logged_in: true
                });
        } else {
            res.json({
                logged_in: false
            });
        }
    } catch (error) {
        res.json({
            logged_in: false
        })
    }


}


let app;

if (process.env.LOCAL) {
    app = createExpressApp()
    app.get('/is-logged-in', isLoggedInHandler);
}
else {
    const router = express.Router();
    router.get('/is-logged-in', (isLoggedInHandler))
    app = createExpressApp(router)
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
