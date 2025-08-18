import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Content } from "../Content/Content";
import { TitleLogo } from "../TitleLogo/TitleLogo";
import "./Layout.css";

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <TitleLogo />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </div>
  );
};
