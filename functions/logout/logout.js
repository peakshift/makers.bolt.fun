
const cookie = require('cookie');
const { CORS_HEADERS } = require('../utils/consts');

exports.handler = async (event, context) => {
    const myCookie = cookie.serialize('Authorization', '', {
        secure: true,
        httpOnly: true,
        path: '/',
        maxAge: -1,
    })
    return {
        statusCode: 200,

        body: JSON.stringify({
            status: 'OK',
        }),
        'headers': {
            'Set-Cookie': myCookie,
            'Cache-Control': 'no-cache',
            ...CORS_HEADERS
        }
    }
};