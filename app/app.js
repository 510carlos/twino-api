import bodyParser from "body-parser";
import cookieSession from 'cookie-session';
import express from "express";
import passport from 'passport';
import Routing from "./core/Routing.js";

import Main from "./main/index.js"

// import routesApp from './routes.app.js';
const BUILD = "../5-pm-somewhere/build";
const PORT = process.env.APP_PORT;

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(BUILD));

app.use(cookieSession({
    name: 'twino-session',
    keys: ['key1', 'key2']
}))

const routes = [
    { path: '/', component: Main, middlewares: []}
];

Routing(app, routes)

app.listen(PORT, () => 
    console.log(`Server running on port: http://localhost:${PORT}`)
);

export default app;