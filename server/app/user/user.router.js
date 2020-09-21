import express from 'express';
import passport from 'passport';
import {
    userLogout,
    authFailure,
    userInfo,
    adminLocationPage,
    isLoggedIn
} from './user.helpers.js'

const router = express.Router();

router.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}))
router.get(
    "/callback", 
    passport.authenticate('google', { failureRedirect: '/failed' }), 
    adminLocationPage
);

router.get("/info", isLoggedIn, userInfo);
router.get("/failure", authFailure)
router.get("/logout", userLogout);

export default router;


