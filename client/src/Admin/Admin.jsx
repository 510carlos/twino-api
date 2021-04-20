import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import AdminRoutes from './Admin.routes';
import { logoutUser } from './Login/login.api';

import 'antd/dist/antd.css';

const { Header, Content } = Layout;

const headerCss = { position: 'fixed', zIndex: 1, width: '100%' };
const contentCss = { padding: '0 50px', marginTop: 64 };
const siteBackground = { padding: 24, minHeight: 380 };

const Admin = () => {
  const history = useHistory();
  const routeChange = (path) => history.push(path);
  const logout = () => logoutUser().then(() => routeChange('/'));

  return (
    <Layout>
      <Header style={headerCss}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item onClick={() => routeChange('/')} key="1">
            Home
          </Menu.Item>
          <Menu.Item onClick={() => routeChange('/admin/location')} key="3">
            Locations
          </Menu.Item>
          <Menu.Item onClick={() => logout()} key="4">
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={contentCss}>
        <div className="site-layout-background" style={siteBackground}>
          <AdminRoutes />
        </div>
      </Content>
    </Layout>
  );
};

export default Admin;
