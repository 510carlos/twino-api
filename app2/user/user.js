import { URL_BASE } from '../utilities/constants.js';
import router from './user.router.js'

const userRoutes = (app) => {
    app.use(`${URL_BASE}/user`, router);
    return app;
}

export default userRoutes;