import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" >
        <img
          src="/images/headerLogo.png"
          alt="Rick and Morty"
           className={styles['header__logo-image']}
        />
      </Link>
    </header>
  );
};
