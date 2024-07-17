import { Box, Typography, Button } from "@mui/material";

export default function NoContent({
  image,
  text,
  btnText,
  onClick,
  theme,
  darkImage,
}) {
  return (
    <Box className="h-full w-full mt-8 text-center flex flex-col items-center justify-center tab:mb-20 lap:mb-36">
      {/* Image */}
      {theme === "dark" ? (
        <img
          src={darkImage}
          alt="No Content"
          className="w-full desk:max-w-[500px] mob:max-w-[300px] h-auto lap:mb-8 mob:mb-4"
        />
      ) : (
        <img
          src={image}
          alt="No Content"
          className="w-full desk:max-w-[500px] mob:max-w-[300px] h-auto lap:mb-8 mob:mb-4"
        />
      )}

      {/* Text */}
      <Typography
        variant="h3"
        sx={{
          color: "primary.main",
          fontSize: {
            lap: "32px",
            desk: "48px",
          },
        }}
        className="lap:!mb-[52px] mob:!mb-6 "
      >
        {text}
      </Typography>
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          padding: "16px 24px",
          fontSize: "16px",
          fontWeight: "400",
          "&.MuiButtonBase-root.lightBlue": {
            backgroundColor: "#34A4E0",
          },
          lineHeight: "150%",
          color: "#10111B",
        }}
        className="uppercase lightBlue"
      >
        {btnText}
      </Button>
    </Box>
  );
}
