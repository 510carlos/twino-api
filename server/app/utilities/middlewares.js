import {
    STATIC_PATH,
    PORT,
    G_OAUTH_CALLBACK_URL,
    G_OAUTH_CLIENT_ID,
    G_OAUTH_CLIENT_SECRET
} from './constants.js';

import path from 'path';
import bodyParser from "body-parser";
import cookieSession from 'cookie-session';
import passport from 'passport';
import express from "express";
import GoogleStrategy from 'passport-google-oauth20';

const middlewares = (app) => {

    passport.use(new GoogleStrategy.Strategy({
        clientID: G_OAUTH_CLIENT_ID,
        clientSecret: G_OAUTH_CLIENT_SECRET,
        callbackURL: G_OAUTH_CALLBACK_URL
      },
      function(accessToken, refreshToken, profile, done) {
        // TODO: Save user to db
        return done(null, profile);
      }
    ));
    
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());

    app.use(cookieSession({
        name: 'twino-session',
        keys: ['key1', 'key2']
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(path.resolve(path.join(`../client/build`))));

    app.listen(PORT, () => 
        console.log(`Server running on port: http://localhost:${PORT}`)
    );
    return app;
}

export default middlewares;