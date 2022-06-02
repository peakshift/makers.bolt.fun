
const cookie = require('cookie')

exports.handler = async (event, context) => {
    // const hour = 3600000
    // const maxAge = 30 * 24 * hour;
    // const _cookie = cookie.serialize('Hello', `Bearer hello`, {
    //     // secure: true,
    //     // httpOnly: true,
    //     path: '/',
    //     maxAge
    // })
    const hour = 3600000
    const twoWeeks = 14 * 24 * hour
    const myCookie = cookie.serialize('Authorization', '', {
        secure: true,
        httpOnly: true,
        path: '/',
        maxAge: -1,
    })
    console.log(myCookie);
    return {
        status: 'OK',
        'headers': {
            'Set-Cookie': myCookie,
            'Cache-Control': 'no-cache',
        }
    }
};