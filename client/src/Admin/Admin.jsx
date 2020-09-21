import React from "react";
import AdminRoutes from './Admin.routes';
import { Layout, Menu } from 'antd';
import { logoutUser } from './Login/login.api';
import { useHistory } from "react-router-dom";


import 'antd/dist/antd.css';

const { Header, Content } = Layout;

const Admin =  () => {
    const history = useHistory();
    const logout = (path) => { 
        logoutUser().then((data) => {
            routeChange("/")
        })
    };

    const routeChange = (path) => { 
        history.push(path);
    };

    return (
    <Layout>
         <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal">
                <Menu.Item onClick={() => routeChange("/")} key="1">Home</Menu.Item>
                <Menu.Item onClick={() => routeChange("/admin/location")} key="3">Locations</Menu.Item>
                <Menu.Item onClick={() => logout()} key="4">Logout</Menu.Item>
            </Menu>
            </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <AdminRoutes />
            </div>
        </Content>
    </Layout>
)};

export default Admin;