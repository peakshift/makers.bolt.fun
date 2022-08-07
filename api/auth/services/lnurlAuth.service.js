const lnurl = require('lnurl')
const crypto = require('crypto')
const { prisma } = require('../../prisma')
const { CONSTS } = require('../../utils')

async function generateK1() {
    let k1 = null
    const maxAttempts = 5
    let attempt = 0
    while (k1 === null && attempt < maxAttempts) {
        k1 = crypto.randomBytes(32).toString('hex')
        const hash = createHash(k1)
        const isUsed = await isHashUsed(hash);
        if (isUsed) {
            k1 = null
        }
        attempt++
    }
    if (!k1) {
        const message = 'Too many failed attempts to generate unique k1'
        throw new Error(message)
    }
    return k1
}

function isHashUsed(hash) {
    return prisma.generatedK1.findFirst({ where: { value: hash } })
}

function addHash(hash) {
    return prisma.generatedK1.create({
        data: {
            value: hash,
        }
    })
}

function removeHash(hash) {
    return prisma.generatedK1.delete({
        where: {
            value: hash,
        }
    })
}

function removeExpiredHashes() {
    const now = new Date();
    const lastHourDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() - 10);

    return prisma.generatedK1.deleteMany({
        where: {
            createdAt: {
                lt: lastHourDate
            }
        }
    })
}



async function generateAuthUrl() {
    const hostname = CONSTS.LNURL_AUTH_HOST ?? 'https://auth.bolt.fun/.netlify/functions/login';
    const secret = await generateK1();
    const hash = createHash(secret);
    await addHash(hash)
    const url = `${hostname}?tag=login&k1=${secret}`
    console.log(url);
    return {
        url,
        encoded: lnurl.encode(url).toUpperCase(),
        secret,
        secretHash: hash,
    }
}

async function getAuthTokenByHash(hash) {
    const data = await prisma.generatedK1.findFirst({
        where: {
            value: hash,
        }
    });
    return data.sid;
}

function associateTokenToHash(hash, token) {
    return prisma.generatedK1.update({
        where: {
            value: hash
        },
        data: {
            sid: token
        }
    })
}

async function verifySig(sig, k1, key) {
    if (!lnurl.verifyAuthorizationSignature(sig, k1, key)) {
        const message = 'Signature verification failed'
        throw new Error(message)
    }
    const hash = createHash(k1)
    const hashExist = await isHashUsed(hash);
    if (!hashExist)
        throw new Error('Provided k1 is not issued by server')
    return { key, hash }
}

function createHash(data) {
    if (!(typeof data === 'string' || Buffer.isBuffer(data))) {
        throw new Error(
            JSON.stringify({ status: 'ERROR', reason: 'Secret must be a string or a Buffer' })
        )
    }
    if (typeof data === 'string') {
        data = Buffer.from(data, 'hex')
    }
    return crypto.createHash('sha256').update(data).digest('hex')
}



module.exports = {
    generateAuthUrl: generateAuthUrl,
    verifySig: verifySig,
    removeHash: removeHash,
    createHash: createHash,
    removeExpiredHashes: removeExpiredHashes,
    getAuthTokenByHash: getAuthTokenByHash,
    associateTokenToHash: associateTokenToHash
}