import { Outlet } from 'react-router-dom';

import { Content, Footer, Header } from '@/Components';

import './Layout.css';

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </div>
  );
};
