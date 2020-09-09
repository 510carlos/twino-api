import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cookieSession from 'cookie-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

import locationRouter from './location/location.routes.js'
import { getLocations } from './location/location.helpers.js'
import { userRouter } from './app/user/user.routes.js'


dotenv.config()

const app = express();
const PORT = process.env.APP_PORT;

app.use(cookieSession({
    name: 'twino-session',
    keys: ['key1', 'key2']
}))

app.use(bodyParser.json());

passport.use(new GoogleStrategy.Strategy({
    clientID: "265948777768-3u6d1h9kd31v0a2lpdbkaudpilrq6hgq.apps.googleusercontent.com",
    clientSecret: "zCCOhuJJhqDgr6KnJNoXlTd8",
    callbackURL: "http://localhost:5000/api/user/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
   console.log(profile);
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

app.use(passport.initialize());
app.use(passport.session());


app.get("/api/", function (req, res) {
    res.send('hello world');
})
app.use("/test", getLocations);
app.use("/api/location", locationRouter);

app.use("/api/user", userRouter);

app.get("/", (req, res) => 
    res.send("this is a test: ")
);

app.listen(PORT, () => 
    console.log(`Server running on port: http://localhost:${PORT}`)
);