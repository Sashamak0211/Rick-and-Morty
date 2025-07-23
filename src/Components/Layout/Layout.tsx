import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Content } from "../Content/Content";
import styles from "./Layout.module.css";
import { Selector } from "../Selector/Selector";
import { useState } from "react";

export const Layout = () => {
  const [selectValue, setSelectValue] = useState<string | null>(null);

  const filters = [
    {
      name: "Species",
      options: [
        { value: "human", label: "Human" },
        { value: "alien", label: "Alien" },
        { value: "humanoid", label: "Humanoid" },
      ],
    },
    {
      name: "Gender",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "unknown", label: "Unknown" },
      ],
    },
    {
      name: "Status",
      options: [
        { value: "alive", label: "Alive", color: "#12B800" },
        { value: "dead", label: "Dead", color: "#DF0000" },
        { value: "unknown", label: "Unknown", color: "#FF9900" },
      ],
    },
  ];

  const handleSelectChange = (value: string | null) => {
    setSelectValue(value);
  };

  return (
    <div className={styles.layout}>
      <Header />

      <div className={styles.filtersContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Filter by name..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.selectorsRow}>
          {filters.map((filter) => (
            <Selector
              key={filter.name}
              options={filter.options}
              value={selectValue}
              onChange={handleSelectChange}
              placeholder={filter.name}
              size="large"
            />
          ))}
        </div>
      </div>

      <Content>
        <Outlet />
      </Content>

      <Footer />
    </div>
  );
};
