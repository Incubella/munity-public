import { Box, Typography } from "@mui/material";

const SingleFee = ({
  feeName,
  fee,
  icon,
  cost,
  haveBorder = true,
  priceSymbol,
}) => {
  return (
    <Box
      className={`flex items-center gap-4 justify-between ${
        haveBorder && "border-b"
      } border-solid pb-3 mb-3`}
      sx={{ borderColor: "primary.border" }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          lineHeight: "normal",
          color: "text.primary",
          fontWeight: "400 !important",
          textTransform: !haveBorder ? "uppercase" : "capitalize",
        }}
      >
        {feeName}
      </Typography>
      {!icon ? (
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: "normal",
            color: "text.primary",
            fontWeight: "400 !important",
          }}
        >
          {fee}
          {priceSymbol && " " + priceSymbol}
        </Typography>
      ) : (
        <Box className="flex items-center gap-[4px]">
          {icon}
          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: "normal",
              color: "text.primary",
              fontWeight: "400 !important",
            }}
          >
            {fee}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: "normal",
              color: "text.tertiary",
              fontWeight: "400 !important",
            }}
          >
            (${cost})
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SingleFee;
