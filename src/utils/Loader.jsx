import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

const Loader = ({ open, loaderText }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999999 }}
      open={open}
    >
      <Box className="flex flex-col items-center justify-center gap-6">
        <CircularProgress color="inherit" />
        {loaderText && (
          <Typography
            sx={{
              fontSize: "24px",
              lineHeight: "normal",
              color: "primary.reversed",
            }}
          >
            {loaderText}
          </Typography>
        )}
      </Box>
    </Backdrop>
  );
};

export default Loader;
