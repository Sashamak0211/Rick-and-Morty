import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Content } from "../Content/Content";

export const Layout = () => {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>

      <Footer />
    </>
  );
};
