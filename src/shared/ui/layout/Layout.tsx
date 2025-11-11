import { Outlet } from 'react-router-dom';

import { Content, Footer, Header } from '@/shared';

import './Layout.css';
import '@/shared/ui/content/Content.css';

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
