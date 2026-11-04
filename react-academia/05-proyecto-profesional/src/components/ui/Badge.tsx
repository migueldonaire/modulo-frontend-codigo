import type { ReactNode } from "react";
import styles from "./Badge.module.css";

type BadgeProps = {
  children: ReactNode;
  warning?: boolean;
};

export function Badge({ children, warning = false }: BadgeProps) {
  const classes = warning ? `${styles.badge} ${styles.warning}` : styles.badge;
  return <span className={classes}>{children}</span>;
}
