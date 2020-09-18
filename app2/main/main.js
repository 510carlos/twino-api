import bodyParser from "body-parser";
import cookieSession from 'cookie-session';
import express from "express";
import passport from 'passport';
// import dotenv from "dotenv";
import GoogleStrategy from 'passport-google-oauth20';

import {
    STATIC_PATH,
    PORT,
    G_OAUTH_CALLBACK_URL,
    G_OAUTH_CLIENT_ID,
    G_OAUTH_CLIENT_SECRET
} from '../utilities/constants.js'

import mainRoutes from './main.router.js'
import locationRoutes from '../location/index.js'
import userRoutes from '../user/index.js'

const _pipe = (a, b) => (arg) => b(a(arg));
const pipe = (...ops) => ops.reduce(_pipe)


const main = () => {

    let app = express();

    app.use(cookieSession({
        name: 'twino-session',
        keys: ['key1', 'key2']
    }))

    

    passport.use(new GoogleStrategy.Strategy({
        clientID: G_OAUTH_CLIENT_ID,
        clientSecret: G_OAUTH_CLIENT_SECRET,
        callbackURL: G_OAUTH_CALLBACK_URL
      },
      function(accessToken, refreshToken, profile, done) {
        /*
         use the profile info (mainly profile id) to check if the user is registerd in ur db
         If yes select the user and pass him to the done callback
         If not create the user and then select him and pass to callback
        */
    //    console.log(profile);
        return done(null, profile);
      }
    ));
    
    passport.serializeUser(function(user, done) {
        /*
        From the user take just the id (to minimize the cookie size) and just pass the id of the user
        to the done callback
        PS: You dont have to do it like this its just usually done like this
        */
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        /*
        Instead of user this function usually recives the id 
        then you use the id to select the user from the db and pass the user obj to the done callback
        PS: You can later access this data in any routes in: req.user
        */
        done(null, user);
    });

    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(STATIC_PATH));
    

    app.listen(PORT, () => 
        console.log(`Server running on port: http://localhost:${PORT}`)
    );

    return pipe(
        locationRoutes, 
        userRoutes,
        mainRoutes,
    )(app);
}


export default main;