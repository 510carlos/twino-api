import Express from 'express';

const Router = Express.Router();

Router.get("/", (req, res, next) => {
    res.Output(200, 'foo API works')
});

export default Router;