import express from "express";

import mainRoutes from './main/main.js'
import locationRoutes from './location/index.js'
import userRoutes from './user/index.js'

import middlewares from './utilities/middlewares.js'
import pipe from './utilities/pipe.js';

const appRoutes = (app) => pipe(
    locationRoutes, 
    userRoutes,
    mainRoutes,
)(app);

const app = () => {
    const app = express();
    return pipe(
        middlewares,
        appRoutes
    )(app);
}

export default app;
