import type { ReactNode } from "react"; // un tipo: "cualquier cosa que React sabe pintar"
import styles from "./Badge.module.css";

type BadgeProps = {
  children: ReactNode; // lo que va entre <Badge> y </Badge>
  warning?: boolean; // naranja para los avisos
};

export function Badge({ children, warning = false }: BadgeProps) {
  const classes = warning ? `${styles.badge} ${styles.warning}` : styles.badge;
  return <span className={classes}>{children}</span>;
}
