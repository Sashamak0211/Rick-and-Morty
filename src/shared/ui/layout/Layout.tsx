import { Outlet } from 'react-router-dom';

import { Content } from '../content';
import { Footer } from '../footer';
import { Header } from '../header';

import '@shared/ui/content/Content.css';
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
