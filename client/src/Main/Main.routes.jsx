import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from './Main';
import { Admin } from '../Admin'

const MainRoutes = () => (
    <Router>
        <Switch>
            <Route path="/admin">
                <Admin />
            </Route>
            <Route path="/">
                <Main />
            </Route>
        </Switch>
    </Router>
);

export default MainRoutes;