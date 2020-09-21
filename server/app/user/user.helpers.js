export const adminLocationPage = (req, res) => res.redirect("/admin/location");;

export const userInfo = (req, res) => res.send(req.user._json);

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
    if(req.user) {
        console.log(req.user)
        const userEmail = req.user._json.email;
        if(emails.includes(userEmail))
            next();
     } else
        res.sendStatus(401);
}