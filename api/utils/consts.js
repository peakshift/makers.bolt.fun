const BOLT_FUN_LIGHTNING_ADDRESS = 'johns@getalby.com'; // #TODO, replace it by bolt-fun lightning address if there exist one
const JWT_SECRET = process.env.JWT_SECRET;
const LNURL_AUTH_HOST = process.env.LNURL_AUTH_HOST
const SESSION_SECRET = process.env.SESSION_SECRET

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Credentials': true
};

const CONSTS = {
    JWT_SECRET,
    BOLT_FUN_LIGHTNING_ADDRESS,
    LNURL_AUTH_HOST,
    CORS_HEADERS,
    SESSION_SECRET
}

module.exports = CONSTS;