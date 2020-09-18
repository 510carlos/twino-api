import { URL_BASE } from '../utilities/constants.js';
import router from './location.router.js'

const locationRoutes = (app) => {
    app.use(`${URL_BASE}/location`, router);
    return app;
}

export default locationRoutes;