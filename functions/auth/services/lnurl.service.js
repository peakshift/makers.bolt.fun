const lnurl = require('lnurl')
const crypto = require('crypto')
const { prisma } = require('../../prisma')
const { CONSTS } = require('../../utils')
const express = require('express');
const session = require("express-session");
const passport = require("passport");
const lnurlAuth = require("passport-lnurl-auth");
const assert = require('assert');
const { HttpError } = require('lnurl/lib');
var SQLiteStore = require('connect-sqlite3')(session);

async function generateSecret() {
    let secret = null
    const maxAttempts = 5
    let attempt = 0
    while (secret === null && attempt < maxAttempts) {
        secret = crypto.randomBytes(32).toString('hex')
        const hash = createHash(secret)
        const isUsed = await isHashUsed(hash);
        if (isUsed) {
            secret = null
        }
        attempt++
    }
    if (!secret) {
        const message = 'Too many failed attempts to generate unique secret'
        throw new Error(message)
    }
    return secret
}

function isHashUsed(hash) {
    return prisma.generatedK1.findFirst({ where: { value: hash } })
}

function addHash(hash, sid) {
    return prisma.generatedK1.create({
        data: {
            value: hash,
            sid,
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
    const lastHourDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 1, now.getMinutes());

    return prisma.generatedK1.deleteMany({
        where: {
            createdAt: {
                lt: lastHourDate
            }
        }
    })
}

async function generateAuthUrl(sid) {
    const hostname = CONSTS.LNURL_AUTH_HOST;
    const secret = await generateSecret()
    await addHash(createHash(secret), sid)
    const url = `${hostname}?tag=login&k1=${secret}`
    return {
        url,
        encoded: lnurl.encode(url).toUpperCase(),
        secret,
    }
}

async function getSidByK1(k1) {
    const hash = createHash(k1)
    const data = await prisma.generatedK1.findFirst({
        where: {
            value: hash,
        }
    });
    return data.sid;
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




function setupAuthMiddelwares(app) {
    app.use(session({
        secret: "12345",
        resave: false,
        saveUninitialized: true,
        store: new SQLiteStore()
    }));

    passport.use(
        new lnurlAuth.Strategy(function (linkingPublicKey, done) {
            const user = { id: linkingPublicKey };
            console.log("Strategy Function");
            console.log(user);
            // let user = map.user.get(linkingPublicKey);
            // if (!user) {
            //     user = { id: linkingPublicKey };
            //     map.user.set(linkingPublicKey, user);
            // }
            done(null, user);
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate("lnurl-auth"));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {

        // done(null, map.user.get(id) || null);
        done(null, id || null);
    });
    return app;
    /*
        app.get(
            "/do-login",
            function (req, res, next) {
                next();
            },
            async function (req, res) {
    
    
                if (req.query.k1 || req.query.key || req.query.sig) {
                    // Check signature against provided linking public key.
                    // This request could originate from a mobile app (ie. not their browser).
                    let session;
                    assert.ok(
                        req.query.k1,
                        new HttpError('Missing required parameter: "k1"', 400)
                    );
                    assert.ok(
                        req.query.sig,
                        new HttpError('Missing required parameter: "sig"', 400)
                    );
                    assert.ok(
                        req.query.key,
                        new HttpError('Missing required parameter: "key"', 400)
                    );
                    session = map.session.get(req.query.k1);
                    assert.ok(
                        session,
                        new HttpError("Secret does not match any known session", 400)
                    );
                    const { k1, sig, key } = req.query;
                    assert.ok(
                        verifyAuthorizationSignature(sig, k1, key),
                        new HttpError("Invalid signature", 400)
                    );
                    session.lnurlAuth = session.lnurlAuth || {};
                    session.lnurlAuth.linkingPublicKey = req.query.key;
    
    
                    const result = await session.save();
                    console.log(result);
                    res.status(200).json({ status: "OK" });
                }
    
                req.session = req.session || {};
                req.session.lnurlAuth = req.session.lnurlAuth || {};
                let k1 = req.session.lnurlAuth.k1 || null;
                if (!k1) {
                    k1 = req.session.lnurlAuth.k1 = generateSecret(32, "hex");
                    map.session.set(k1, req.session);
                }
    
                const callbackUrl =
                    "https://" +
                    `${req.get("host")}/do-login?${querystring.stringify({
                        k1,
                        tag: "login",
                    })}`;
    
                const encoded = lnurl.encode(callbackUrl).toUpperCase();
                const qrCode = await qrcode.toDataURL(encoded);
                return res.json({
                    lnurl: encoded,
                    qrCode: qrCode,
                });
            }
        );
        */

    // app.get("/logout", function (req, res, next) {
    //     if (req.user) {
    //         req.session.destroy();
    //         return res.redirect("/");
    //     }
    //     next();
    // });

    // app.get("/me", function (req, res, next) {
    //     res.json({ user: req.user ? req.user : null });

    //     next();
    // });

    // app.get("/profile", function (req, res, next) {
    //     if (!req.user) {
    //         return res.redirect("/login");
    //     }

    //     res.render("profile", { user: req.user });

    //     next();
    // });
}

module.exports = {
    generateAuthUrl: generateAuthUrl,
    verifySig: verifySig,
    removeHash: removeHash,
    createHash: createHash,
    removeExpiredHashes: removeExpiredHashes,
    getSidByK1: getSidByK1
}