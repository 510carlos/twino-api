import { URL_BASE } from '../utilities/constants.js';
import userRouter from './user.router.js'

const userRoutes = (app) => {
    app.use(`${URL_BASE}/user`, userRouter);
    return app;
}

export default userRoutes;