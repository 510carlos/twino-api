import {G_OAUTH_CALLBACK_URL} from '../utilities/constants.js'

export const googleCallback = (req, res) => res.redirect(G_OAUTH_CALLBACK_URL);

export const userInfo = (req, res) => res.send(req.user_json);

export const authFailure = (req, res) => res.sendStatus(401);

export const userLogout = (req, res) => {
    req.session = null;
    req.logout();
    res.send('logged out');
}

export const isLoggedIn = (req, res, next) => {
    const emails = [
        "carlos.mendoza.91@gmail.com",
        "theweekendisneverover@gmail.com"
    ]
    console.log(req.user)
    if(req.user){
        const userEmail = req.user._json.email;
        if(emails.includes(userEmail))
            next();
    }
    res.sendStatus(401);
}