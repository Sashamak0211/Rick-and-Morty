import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Content } from '../content';
import { Footer } from '../footer';
import { Header } from '../header';

import './Layout.css';

export const Layout = () => {
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  });

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
