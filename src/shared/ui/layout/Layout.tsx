import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useThemeStore } from '@/app/storeZustand/useThemeStore';

import { Content } from '../content';
import { Footer } from '../footer';
import { Header } from '../header';

import './Layout.css';

export const Layout = () => {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

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
