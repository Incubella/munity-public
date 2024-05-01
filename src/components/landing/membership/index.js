/* eslint-disable import/no-anonymous-default-export */
import { Box, Divider, Typography } from "@mui/material";
import styles from "./membership.module.scss";

export default function Membership() {
  return (
    <Box className={styles["container"]}>
      <Divider sx={{ mb: "2rem", background: "white" }} />
      <Box className="flex fj-sb">
        <Typography color="secondary" className={styles["title"]}>
          Creator Sourced,
          <br />
          Member-Enabled,
          <br />
          Community Governed
        </Typography>
        <Typography className={styles["number"]}>04.</Typography>
      </Box>
      <Box className="flex flex-1 fj-sb">
        <Box
          className={`flex fc flex-1 ${styles["box"]}`}
          sx={{ flex: 3, mr: "1.5rem" }}
        >
          <Typography color="secondary" className={styles["head"]}>
            NFT Ticketing
          </Typography>
          <Divider sx={{ background: "#e8e9f4", my: "1rem" }} />
          <Box className="flex-1 bg-white">&nbsp;</Box>
        </Box>
        <Box
          className={`bg-trans flex fc flex-1 ${styles["box"]}`}
          sx={{ flex: 2, ml: "1.5rem" }}
        >
          <Typography color="secondary" className={styles["head"]}>
            NFT Certifications
            <br />
            For course creators
          </Typography>
          <Divider sx={{ background: "#e8e9f4", my: "1rem" }} />
          <Box className="flex-1 bg-white">&nbsp;</Box>
        </Box>
      </Box>
      <Box className={`flex fc flex-1 ${styles["box"]}`}>
        <Typography color="secondary" className={styles["head"]}>
          On-chain membership
        </Typography>
        <Divider sx={{ background: "#e8e9f4", my: "1rem" }} />
        <Box className="flex-1 bg-white">&nbsp;</Box>
      </Box>
    </Box>
  );
}
