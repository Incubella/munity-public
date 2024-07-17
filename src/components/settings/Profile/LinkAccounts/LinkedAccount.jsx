/* eslint-disable import/no-anonymous-default-export */
import { Box, Typography, Button } from "@mui/material";
import LinkOffSharpIcon from "@mui/icons-material/LinkOffSharp";
import Card from "../../../Card";

export default function LinkedAccount({ icon, label }) {
  return (
    <Card
      childrenStyles="flex flex-wrap items-center gap-6"
      classNames="mob:px-4 p-6"
    >
      <Box>{icon}</Box>
      <Box>
        <Typography
          sx={{
            lineHeight: "normal",
            fontWeight: "400 !important",
            color: "text.primary",
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            lineHeight: "normal",
            fontWeight: "400 !important",
            color: "#6271FD",
          }}
          className="!mt-[6px]"
        >
          Connected
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          lineHeight: "120%",
          color: "primary.reversed",
          ".MuiButton-startIcon": { margin: "0" },
        }}
        startIcon={<LinkOffSharpIcon />}
        className="!ml-auto !max-w-fit mob:!p-3 lap:!py-3 lap:!px-6 !min-w-fit gap-3 black"
      >
        <span className="mob:hidden lap:block text-inherit">Unlink</span>
      </Button>
    </Card>
  );
}
