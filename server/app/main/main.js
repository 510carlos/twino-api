import path from 'path';
import { RELALTIVE_BUILD_PATH } from '../utilities/constants.js';

const mainRoutes = (app) => {
    const frontend = path.resolve(path.join(RELALTIVE_BUILD_PATH, "index.html"));
    app.get(["/", "/*"], (req, res) => 
        res.sendFile(frontend)
    );
    return app;
};


export default mainRoutes;