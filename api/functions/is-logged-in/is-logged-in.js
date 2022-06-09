
const serverless = require('serverless-http');
const { getAuthTokenByHash } = require('../../auth/services/lnurl.service');
const { createExpressApp } = require('../../modules');
const express = require('express');
const jose = require('jose');
const { JWT_SECRET } = require('../../utils/consts');
const lnurlService = require('../../auth/services/lnurl.service');


const isLoggedInHandler = async (req, res) => {
    // console.log(req.cookies);
    try {
        const login_session = req.cookies?.login_session;
        // console.log(login_session);
        if (login_session) {

            const { payload } = await jose.jwtVerify(login_session, Buffer.from(JWT_SECRET), {
                algorithms: ['HS256'],
            });
            const hash = payload.hash;
            console.log(hash);
            const token = await getAuthTokenByHash(hash);
            console.log(token);

            lnurlService.removeHash(hash).catch();
            lnurlService.removeExpiredHashes().catch();

            res
                .status(200)
                .clearCookie('login_session', {
                    secure: true,
                    httpOnly: true,
                })
                .cookie('Authorization', token, {
                    maxAge: 3600000 * 24 * 30,
                    secure: true,
                    httpOnly: true,
                })
                .json({
                    logged_in: true
                });
            // console.log(payload);
        } else {

            res.json({
                me: null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            logged_in: false
        })
    }


    // get session token
    // check DB to see if this token has an accossiated jwt auth token to it
    // if yes: 
    // set the auth token to cookie
    // remove the session token
    // remove the data row

}

express.Router().get('id', (req, res) => {
    res.clearCookie('Au')
})


let app;

if (process.env.LOCAL) {
    app = createExpressApp()
    app.get('/is-logged-in', isLoggedInHandler);
}
else {
    const router = express.Router();
    router.get('/is-logged-in', isLoggedInHandler)
    app = createExpressApp(router)
}


const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};
