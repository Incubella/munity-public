import { Box, Typography } from "@mui/material";

const SingleDetail = ({ name, children }) => {
  return (
    <Box className="flex items-center gap-3 flex-wrap justify-center">
      <Typography
        sx={{
          fontSize: "16.5px",
          lineHeight: "120%",
          color: "text.secondary",
          textTransform: "uppercase",
          fontWeight: "400 !important",
        }}
      >
        {name}
      </Typography>
      {children}
    </Box>
  );
};

export default SingleDetail;
