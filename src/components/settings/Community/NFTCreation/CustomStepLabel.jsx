/* eslint-disable import/no-anonymous-default-export */
import { Box, Typography } from "@mui/material";

export default function CustomStepLabel({
  containedCSS = "",
  text,
  activeStep,
  index,
  isSecond = false,
}) {
  return (
    <Box
      sx={{
        marginTop: 3,
        padding: "12px 24px",
        position: "relative",
        backgroundColor: isSecond
          ? activeStep === index
            ? "rgba(52, 164, 224, 0.10)"
            : "background.inputBG"
          : activeStep === index
          ? "rgba(52, 164, 224, 0.10)"
          : "#34A4E0",
        clipPath: "polygon(6.3% 0, 100% 0, 95% 100%, 0% 100%)",
      }}
      className={"max-w-fit " + containedCSS}
    >
      <Typography
        sx={{
          color: isSecond
            ? activeStep === index
              ? "#0F5888"
              : "text.tertiary"
            : activeStep === index
            ? "#0F5888"
            : "#10111B",
          fontSize: "18px",
          lineHeight: "160%",
          fontWeight: "400 !important",
          letterSpacing: "-0.36px",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
