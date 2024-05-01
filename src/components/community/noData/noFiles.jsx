import { Box, Typography } from "@mui/material";

export default function NoFiles({ image, text }) {
  // const { theme } = props;
  return (
    <Box
      // sx={{
      //   backgroundColor: "primary.reversed",
      // }}
      className="h-full w-full mt-8 text-center flex flex-col items-center justify-center  tab:mb-20 lap:mb-36"
    >
      {/* Image */}
      <img
        src={image}
        alt="No NFTs"
        className="w-full lap:max-w-[500px] mob:max-w-[300px] h-auto lap:mb-8 mob:mb-6"
      />

      {/* Text */}
      <Typography
        variant="h3"
        sx={{ color: "primary.main" }}
        // className="lap:!mb-[52px] mob:!mb-6"
      >
        {text}
      </Typography>
    </Box>
  );
}
