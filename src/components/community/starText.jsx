/* eslint-disable import/no-anonymous-default-export */
import { Box, Typography } from "@mui/material";
export default (props) => {
  const { starIcon, text } = props;

  return (
    <Box className="flex mob:items-start tab:items-center mob:gap-3 tab:gap-4">
      <Box>{starIcon}</Box>
      <Typography
        color={"text.primary"}
        fontSize={{
          mob: "16.5px",
          tab: "18px",
        }}
        lineHeight={{
          mob: "120% !important",
          tab: "normal !important",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
