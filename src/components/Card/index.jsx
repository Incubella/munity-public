import { Typography, Box } from "@mui/material";

export default function Card({
  children,
  title,
  classNames = "mob:p-3 tab:p-4 lap:p-6",
  childrenStyles = "",
  borderColor = "primary.border",
  addSX = {},
  onClick = undefined,
}) {
  return (
    <Box
      sx={{ borderColor: borderColor, ...addSX }}
      className={"border border-solid " + classNames}
      onClick={onClick}
    >
      {title && (
        <Box
          sx={{ borderColor: borderColor }}
          className="w-full pb-4 border-b border-solid mob:mb-4 tab:mb-6"
        >
          <Typography
            fontSize={"18px"}
            fontWeight={"400 !important"}
            lineHeight={"normal"}
            color={"text.primary"}
          >
            {title}
          </Typography>
        </Box>
      )}
      <Box className={childrenStyles}>{children}</Box>
    </Box>
  );
}
