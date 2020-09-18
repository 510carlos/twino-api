import Express from 'express';
import Routing from '../core/Routing.js';
import routes from './main.routes.js';

const Router = Express.Router();

export default Routing(Router, routes)