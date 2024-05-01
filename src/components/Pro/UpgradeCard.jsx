/* eslint-disable import/no-anonymous-default-export */
import { Button, Box, Typography } from "@mui/material";

export default function UpgradeCard() {
  return (
    <Box
      className="mob:p-4 tab:p-6 desk:p-8"
      sx={{ backgroundColor: "rgba(52, 164, 224, 0.10)" }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          lineHeight: "120%",
          color: "#0F5888",
          marginBottom: "16px",
        }}
      >
        Upgrade to PRO!
      </Typography>
      <Typography
        sx={{
          fontSize: "16.5px",
          lineHeight: "120%",
          color: "text.primary",
          marginBottom: "24px",
        }}
      >
        You can create only 1 channel with a free account, But up to 5 with
        Munity PRO!
      </Typography>
      <Button
        variant="contained"
        className={" !leading-[150%] !min-w-fit uppercase "}
        component="label"
        sx={{
          color: "text.primary",
          fontWeight: "400 !important",
          backgroundColor: "#34A4E0",
        }}
        // onClick={onClick}
      >
        UPGRADE NOW!
      </Button>
    </Box>
  );
}
