
const cookie = require('cookie')

exports.handler = async (event, context) => {
    const myCookie = cookie.serialize('Authorization', '', {
        secure: true,
        httpOnly: true,
        path: '/',
        maxAge: -1,
    })
    return {
        body: JSON.stringify({
            status: 'OK',
        }),
        'headers': {
            'Set-Cookie': myCookie,
            'Cache-Control': 'no-cache',
        }
    }
};