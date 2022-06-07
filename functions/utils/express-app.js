
const express = require('express');
const session = require("express-session");
const passport = require("passport");
const lnurlAuth = require("passport-lnurl-auth");
const { sessionsStore } = require('./sessionsStore');
var cors = require('cors');
const { SESSION_SECRET } = require('./consts');

const createExpressApp = () => {

    const app = express();

    app.use(cors({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
    }))

    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        store: sessionsStore,
        saveUninitialized: true,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        }
    }));


    passport.use(new lnurlAuth.Strategy(function (linkingPublicKey, done) {
        // The user has successfully authenticated using lnurl-auth.
        // The linked public key is provided here.
        // You can use this as a unique reference for the user similar to a username or email address.
        const user = { id: linkingPublicKey };
        done(null, user);
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate("lnurl-auth"));
    passport.serializeUser(function (user, done) {
        done(null, user?.id);
    });
    passport.deserializeUser(function (id, done) {
        done(null, { id } || null);
    });

    return app;
}

module.exports = { createExpressApp };