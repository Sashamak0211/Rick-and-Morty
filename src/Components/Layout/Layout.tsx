import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Content } from "../Content/Content";
import "./Layout.css";
import { FilterPanel } from "../../Widget/FilterPanel";

export const Layout = () => {
  const handleFiltersChange = () => {};

  return (
    <div className="layout">
      <Header />
      <div className="filters">
        <FilterPanel onChange={handleFiltersChange} />
      </div>

      <Content>
        <Outlet />
      </Content>

      <Footer />
    </div>
  );
};
