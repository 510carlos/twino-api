import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LocationsTable } from './Location';
import { GoogleLogin } from './Login';
import UserAuth from './Login/UserAuth';

const AdminRoutes = () => (
  <Switch>
    <Route path="/admin/location">
      <UserAuth>
        <LocationsTable />
      </UserAuth>
    </Route>
    <Route path="/admin">
      <GoogleLogin />
    </Route>
  </Switch>
);

export default AdminRoutes;
