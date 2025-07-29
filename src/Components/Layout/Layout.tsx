import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Content } from "../Content/Content";
import "./Layout.css"
import { Selector } from "../Selector/Selector";
import { useState } from "react";

interface IFilterConfig {
  name: string;
  options: {
    value: string;
    label: string;
    color?: string;
  }[];
  size: "large" | "small";
}

export const Layout = () => {
  const [selectValue, setSelectValue] = useState<string | null>(null);

  const filtersConfig: IFilterConfig[] = [
    {
      name: "Species",
      options: [
        { value: "human", label: "Human" },
        { value: "alien", label: "Alien" },
        { value: "humanoid", label: "Humanoid" },
      ],
      size: "large",
    },
    {
      name: "Gender",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "unknown", label: "Unknown" },
      ],
      size: "large",
    },
    {
      name: "Status",
      options: [
        { value: "alive", label: "Alive", color: "#12B800" },
        { value: "dead", label: "Dead", color: "#DF0000" },
        { value: "unknown", label: "Unknown", color: "#FF9900" },
      ],
      size: "large",
    },
  ];

  return (
    <div className="layout">
      <Header />
      <div className="filters">
        {filtersConfig.map((filter) => (
          <Selector
            key={filter.name}
            options={filter.options}
            value={selectValue}
            onChange={setSelectValue}
            placeholder={filter.name}
            size={filter.size}
          />
        ))}
      </div>

      <Content>
        <Outlet />
      </Content>

      <Footer />
    </div>
  );
};
