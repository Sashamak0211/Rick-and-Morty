import type React from "react";
import styles from "./Content.module.css";

interface IContentProps {
  children: React.ReactNode;
}

export const Content: React.FC<IContentProps> = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};
