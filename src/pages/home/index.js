/* eslint-disable import/no-anonymous-default-export */
import { Box, Grid, Typography } from "@mui/material";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <Box className={styles["container"]}>
      <Grid item container columnSpacing={2} rowSpacing={2}>
        <Grid item md={4} sx={{ display: { xs: "none", md: "block" } }} />
        <Grid item md={4} xs={12}>
          <Box
            sx={{
              p: "0.5rem",
              background: "#131516",
              borderRadius: "1rem",
            }}
          >
            <Typography className="w100" textAlign="center" color="white">
              Home Page
            </Typography>
          </Box>
        </Grid>
        <Grid item md={4} sx={{ display: { xs: "none", md: "block" } }} />
      </Grid>
    </Box>
  );
}
