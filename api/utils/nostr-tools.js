// import * as secp256k1 from '@noble/secp256k1'
// import { Buffer } from 'buffer'
const secp256k1 = require('@noble/secp256k1');
const crypto = require('crypto')

function generatePrivateKey() {
    return Buffer.from(secp256k1.utils.randomPrivateKey()).toString('hex')
}

function getPublicKey(privateKey) {
    return Buffer.from(secp256k1.schnorr.getPublicKey(privateKey)).toString('hex')
}


function serializeEvent(evt) {
    return JSON.stringify([
        0,
        evt.pubkey,
        evt.created_at,
        evt.kind,
        evt.tags,
        evt.content
    ])
}


function getEventHash(event) {
    let eventHash = crypto.createHash('sha256')
        .update(Buffer.from(serializeEvent(event)))
        .digest()
    return Buffer.from(eventHash).toString('hex')
}


async function signEvent(event, key) {
    return Buffer.from(
        await secp256k1.schnorr.sign(getEventHash(event), key)
    ).toString('hex')
}

module.exports = {
    generatePrivateKey,
    getPublicKey,
    signEvent,
}