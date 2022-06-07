
const { prisma } = require('../prisma');
const LnurlService = require('../auth/services/lnurl.service')
const cookie = require('cookie')
const jose = require('jose');
const { CONSTS } = require('../utils');
const { CORS_HEADERS } = require('../utils/consts');
const serverless = require('serverless-http');
// const { expressApp } = require('../utils/express-app');
// const { sessionsStore } = require('../utils/sessionsStore');
const { getSidByK1 } = require('../auth/services/lnurl.service');
const express = require('express')

const session = require("express-session");
const passport = require("passport");
const lnurlAuth = require("passport-lnurl-auth");
// const { sessionsStore } = require('./sessionsStore');
var cors = require('cors');
const { createExpressApp } = require('../utils/express-app');
const { sessionsStore } = require('../utils/sessionsStore');

async function login(req, res) {

    const { tag, k1, sig, key } = req.query;
    if (tag !== 'login') {
        return {
            statusCode: 400,
            CORS_HEADERS,
            body: JSON.stringify({ status: 'ERROR', reason: 'Not a login request' })
        }
    }

    try {
        await LnurlService.verifySig(sig, k1, key)
    } catch (error) {
        return {
            statusCode: 400,
            CORS_HEADERS,
            body: JSON.stringify({ status: 'ERROR', reason: 'Invalid Signature' })
        }
    }


    try {
        const user = await prisma.user.findFirst({ where: { pubKey: key } })
        if (user === null) {
            await prisma.user.create({
                data: {
                    pubKey: key,
                    name: key,
                    avatar: `https://avatars.dicebear.com/api/bottts/${key}.svg`
                }
            })
        }



        // Set cookies on the user's headers
        const hour = 3600000
        const maxAge = 30 * 24 * hour
        const jwtSecret = CONSTS.JWT_SECRET;

        LnurlService.removeHash(LnurlService.createHash(k1)).catch();
        LnurlService.removeExpiredHashes().catch();

        const jwt = await new jose.SignJWT({ pubKey: key })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(maxAge)
            //TODO: Set audience, issuer
            .sign(Buffer.from(jwtSecret, 'utf-8'))



        const authCookie = cookie.serialize('Authorization', `Bearer ${jwt}`, {
            secure: true,
            httpOnly: true,
            path: '/',
            maxAge: maxAge,
            sameSite: 'none',
        })

        return {

            statusCode: 200,
            'headers': {
                'Set-Cookie': authCookie,
                'Cache-Control': 'no-cache',
                ...CORS_HEADERS
            },
            body: JSON.stringify({
                status: 'OK',
            })
        }
    } catch (error) {
        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: JSON.stringify({ status: 'ERROR', reason: 'Unexpected error happened, please try again' })
        }


    }
}

const app = createExpressApp();

app.get('/login', async (req, res) => {
    const { tag, k1, sig, key } = req.query;

    // Generate an auth URL
    if (!sig || !key) {

        const data = await LnurlService.generateAuthUrl(req.sessionID);
        return res.status(200).json(data);
    }
    else {
        if (tag !== 'login')
            return res.status(400).send("Invalid tag provided")

        // Verify login params 
        try {
            await LnurlService.verifySig(sig, k1, key)
        } catch (error) {
            return res.status(400).json({ status: 'ERROR', reason: 'Invalid Signature' })

        }


        try {
            //Create user if not already existing
            const user = await prisma.user.findFirst({ where: { pubKey: key } })
            if (user === null) {
                await prisma.user.create({
                    data: {
                        pubKey: key,
                        name: key,
                        avatar: `https://avatars.dicebear.com/api/bottts/${key}.svg`
                    }
                })
            }


            // Update the session with the secret
            const sid = await getSidByK1(k1);
            const d = await new Promise((res, rej) => {
                sessionsStore.get(sid, (err, d) => {
                    if (err) rej(err);
                    res(d)
                })
            });
            // console.log(d);
            await new Promise((res, rej) => {
                sessionsStore.set(sid, { ...d, lnurlAuth: { linkingPublicKey: key } }, (err) => {
                    if (err) rej(err);
                    res()
                })
            });


            LnurlService.removeHash(LnurlService.createHash(k1)).catch();
            LnurlService.removeExpiredHashes().catch();

            return res.status(200).json({ status: "OK" })

            // const jwt = await new jose.SignJWT({ pubKey: key })
            //     .setProtectedHeader({ alg: 'HS256' })
            //     .setIssuedAt()
            //     .setExpirationTime(maxAge)
            //     //TODO: Set audience, issuer
            //     .sign(Buffer.from(jwtSecret, 'utf-8'))



            // const authCookie = cookie.serialize('Authorization', `Bearer ${jwt}`, {
            //     secure: true,
            //     httpOnly: true,
            //     path: '/',
            //     maxAge: maxAge,
            //     sameSite: 'none',
            // })


        } catch (error) {
            console.log(error);
            return res.status(200).json({ status: 'ERROR', reason: 'Unexpected error happened, please try again' })
        }
    }
})

const handler = serverless(app);
exports.handler = async (event, context) => {
    return await handler(event, context);
};