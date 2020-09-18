import express from 'express';
import passport from 'passport';

import {
    userLogout,
    authFailure,
    userInfo,
    googleCallback,
    isLoggedIn
} from './user.helpers.js'

import {G_OAUTH_CLIENT_ID} from '../utilities/constants.js'

const router = express.Router();

router.get("/test", (req, res) => {
    res.send(G_OAUTH_CLIENT_ID)
});
router.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}))
router.get("/callback", passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {
        res.redirect(`${process.env.G_OAUTH_CALLBACK_URL}`);
    }
);

// router.get("/callback", passport.authenticate('google', { failureRedirect: '/failed' }), googleCallback)
router.get("/info", isLoggedIn, userInfo)
router.get("/failure", authFailure)
router.get("/logout", userLogout);
router.get("/", (req, res) => {
    res.send("hello wascsa /")
});

export default router;


