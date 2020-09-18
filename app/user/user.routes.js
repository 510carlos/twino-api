import express from 'express';
import passport from 'passport';
import dotenv from "dotenv"
// import { getAuthUsers } from './user.herlpers.js'


dotenv.config()


const userRouter = express.Router();

const isLoggedIn = (req, res, next) => {
    const emails = [
        "carlos.mendoza.91@gmail.com",
        "theweekendisneverover@gmail.com"
    ]
    if(req.user){
        const userEmail = req.user._json.email;
        if(emails.includes(userEmail))
            next();
    }
    res.sendStatus(401);
}

// userRouter.get("/authenticated", (req, res) => {
//     let foo = getAuthUsers((error, results) => {
//         let emails = []
//         for(var i = 0; i < results.length; i++)
//             emails.push(results[i]["email"])
//         // res.send(emails);
//     });

//     console.log(foo)
// })

userRouter.get("/user", function (req, res) {
    if(!req.user) {
        res.redirect('/api/user/google');
    }
    return res.send(`Welcome mr ${req.user.displayName}!`)
})

userRouter.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}));

userRouter.get("/callback", 
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {
        res.redirect(`${process.env.G_OAUTH_CALLBACK_URL}`);
    }
);

userRouter.get("/info", isLoggedIn, function (req, res) {
    return res.send(req.user._json)
})

userRouter.get("/failure", function (req, res) {
    res.sendStatus(401);
})

userRouter.get("/logout", function (req, res) {
    req.session = null;
    req.logout();
    res.send('logged out');
})

export { userRouter };