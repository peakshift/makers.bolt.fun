
const cookie = require('cookie')
const jose = require('jose');
const { JWT_SECRET } = require("./consts");

const extractUserFromCookie = async (cookieHeader) => {
    const cookies = cookie.parse(cookieHeader ?? '');
    const token = cookies.Authorization;
    if (token) {
        try {
            const { payload } = await jose.jwtVerify(token, Buffer.from(JWT_SECRET), {
                algorithms: ['HS256'],
            });
            if (payload.userId)
                return { pubKey: payload.pubKey, id: payload.userId }
        } catch (error) {
            return null
        }
    }
    return null;
}

module.exports = extractUserFromCookie;