import { Link } from "react-router-dom";
import styles from '../Components/Content/Content.module.css'

export const CharacterCard = () => {
  return (
    <div className={styles.cardBox}>
      <h1>Информация о персонаже</h1>
      <Link to='/' className={styles.back}>
      ← GO BACK
      </Link>
    </div>
  );
};
