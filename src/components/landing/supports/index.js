/* eslint-disable import/no-anonymous-default-export */
import { Box, Divider, Typography } from "@mui/material";
import styles from "./supports.module.scss";

export default function Supports() {
  return (
    <Box className={styles["container"]}>
      <Divider sx={{ mb: "2rem" }} />
      <Box className="flex fj-sb" sx={{ mb: "15rem" }}>
        <Typography className={styles["title"]}>Munity Supports</Typography>
        <Typography className={styles["number"]}>05.</Typography>
      </Box>
    </Box>
  );
}
