
const { prisma } = require('../prisma');
const LnurlService = require('../auth/services/lnurl.service')
const cookie = require('cookie')
const jose = require('jose');
const { CONSTS } = require('../utils');


async function generateAuthUrl() {
    const data = await LnurlService.generateAuthUrl();
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}


async function login(tag, k1, sig, key) {
    if (tag !== 'login') {
        return {
            statusCode: 400,
            body: JSON.stringify({ status: 'ERROR', reason: 'Not a login request' })
        }
    }

    try {
        await LnurlService.verifySig(sig, k1, key)
    } catch (error) {
        return {
            statusCode: 400,
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
        })

        return {

            statusCode: 200,
            'headers': {
                'Set-Cookie': authCookie,
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify({
                status: 'OK',
            })
        }
    } catch (error) {
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'ERROR', reason: 'Unexpected error happened, please try again' })
        }


    }
}



exports.handler = async (event, context) => {
    const { tag, k1, sig, key } = event.queryStringParameters ?? {}

    if (event.httpMethod !== "GET") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!sig || !key) {
        return generateAuthUrl();
    }
    else {
        return login(tag, k1, sig, key)
    }
};