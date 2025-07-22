import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Content } from "../Content/Content";
import styles from "./Layout.module.css";

export const Layout = () => {
  return (
    <>
      <div className={styles.layout}>
        <Header />
        <Content>
          <Outlet />
        </Content>

        <Footer />
      </div>
    </>
  );
};
