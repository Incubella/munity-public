import { Box, Typography } from "@mui/material";

const SingleDet = ({ name, value }) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "14px",
          lineHeight: "normal",
          color: "text.secondary",
          fontWeight: "400 !important",
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          fontSize: "16.5px",
          lineHeight: "120%",
          color: "text.primary",
          fontWeight: "400 !important",
        }}
        className="!mt-[4px]"
      >
        {value}
      </Typography>
    </Box>
  );
};

export default SingleDet;
