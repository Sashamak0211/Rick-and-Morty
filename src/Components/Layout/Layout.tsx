import { Outlet } from 'react-router-dom';

import { Content } from '@Components/Content/Content';
import { Footer } from '@Components/Footer/Footer';
import { Header } from '@Components/Header/Header';

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
