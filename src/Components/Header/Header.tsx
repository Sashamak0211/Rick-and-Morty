import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img
          src="/images/headerLogo.png"
          alt="Rick and Morty"
          className={styles.logoImage}
        />
      </Link>
    </header>
  );
};
