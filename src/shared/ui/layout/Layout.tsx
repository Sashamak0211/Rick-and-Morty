import { Outlet } from 'react-router-dom';

import { Content, Footer, Header } from '@/shared';

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
