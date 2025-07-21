// import { Content } from "../Content/Content"
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = () => {
  return (
    <>
      <Header />
      {/* <Content /> */}
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
