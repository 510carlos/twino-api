import path from 'path';
import { 
    STATIC_PATH 
} from '../utilities/constants.js';

const mainRoutes = (app) => {
    app.get(["/", "/*"], (req, res) => 
        res.sendFile(path.join(STATIC_PATH, "index.html"))
    );
    return app;
};


export default mainRoutes;