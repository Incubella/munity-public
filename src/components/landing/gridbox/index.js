/* eslint-disable import/no-anonymous-default-export */
import { Box, Divider } from "@mui/material";
import styles from "./gridbox.module.scss";

export default function Gridbox({ children }) {
  return (
    <Box className={styles["container"]}>
      <Box className={styles["gridbox"]}>
        <Divider className={styles["top"]} />
        <Divider orientation="vertical" className={styles["leftTop"]} />
        <Divider orientation="vertical" className={styles["rightTop"]} />
        <Divider orientation="vertical" className={styles["leftBottom"]} />
        <Divider orientation="vertical" className={styles["rightBottom"]} />
        <Divider className={styles["bottom"]} />
      </Box>
      {children}
    </Box>
  );
}
