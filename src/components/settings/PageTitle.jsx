/* eslint-disable import/no-anonymous-default-export */
import { Box, Typography } from "@mui/material";

export default function PageTitle({ title }) {
  return (
    <Box
      className="border-t border-solid pt-6 mob:mb-6 lap:mb-8"
      sx={{ borderColor: "primary.border" }}
    >
      <Typography
        fontSize={{ mob: "18px", tab: "24px" }}
        fontWeight={"400 !important"}
        letterSpacing={"-0.48px"}
        lineHeight={"120%"}
        className="uppercase"
        color={"text.primary"}
      >
        {title}
      </Typography>
    </Box>
  );
}
