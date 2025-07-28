import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Components/Content/Content.module.css";
import { Selector } from "../Components/Selector/Selector";

export const CharacterList = () => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const statusOptions = [
    { value: "alive", label: "Alive", color: "#12B800" },
    { value: "dead", label: "Dead", color: "#DF0000" },
    { value: "unknown", label: "Unknown", color: "#FF9900" },
  ];

  return (
    <div className={styles["cards-container"]}>
      {[1, 2, 3, 4].map((id) => (
        <div key={id} className={styles.card}>
          <div onClick={(e) => e.stopPropagation()}>
            <Selector
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Status"
              size="small"
            />
          </div>
          <Link to={`character/${id}`} className={styles['card__link']} />
        </div>
      ))}
    </div>
  );
};
