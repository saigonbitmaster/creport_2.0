import * as React from 'react';
import { Layout, LayoutProps } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';

const AppLayout = (props: LayoutProps) => {
    return <Layout {...props} appBar={AppBar} menu={Menu} />;
};


export default AppLayout;