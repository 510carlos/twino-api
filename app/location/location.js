import { URL_BASE } from '../utilities/constants.js';
import locationRouter from './location.router.js'

const locationRoutes = (app) => {
    app.use(`${URL_BASE}/location`, locationRouter);
    return app;
}

export default locationRoutes;