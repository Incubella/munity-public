/* eslint-disable import/no-anonymous-default-export */
import { Box, Divider } from "@mui/material";
import styles from "./gridbox.module.scss";

export default function ButtonGrid({ className, onClick, children }) {
  return (
    <Box
      className={`flex ai-ce fj-ce ${styles["container"]} ${styles["btn"]} ${className}`}
      onClick={onClick}
    >
      <Box className={`${styles["gridbox"]}`}>
        <Divider className={styles["top"]} />
        <Divider orientation="vertical" className={styles["left"]} />
        <Divider orientation="vertical" className={styles["right"]} />
        <Divider className={styles["bottom"]} />
      </Box>
      {children}
    </Box>
  );
}
