import path from 'path';
import { 
    URL_BASE, 
    STATIC_PATH 
} from '../utilities/constants.js';

const mainRoutes = (app) => {
    app.use(`${URL_BASE}/`, (req, res) => res.send("hello world main"));
    // app.use(`/`, (req, res) => res.redirect(`${URL_BASE}`));
    app.get(["/", "/*"], (req, res) => 
        res.sendFile(path.join(STATIC_PATH, "index.html"))
    );
    return app;
};


export default mainRoutes;