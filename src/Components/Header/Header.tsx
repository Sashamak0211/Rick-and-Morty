import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <h1 className={styles.title}>Rick & Morty</h1>
      </Link>
    </header>
  );
};
