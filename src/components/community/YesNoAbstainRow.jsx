import { Typography, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function YesNoAbstainRow({ checked, amount, percent, type }) {
  // Helper function to format numbers with K for thousands, M for millions
  const formatNumber = (num) => {
    // Round the number first to avoid floating-point issues
    const roundedNum = Math.round(num);
    if (roundedNum >= 1000000) {
      return (roundedNum / 1000000).toFixed(1) + "M";
    } else if (roundedNum >= 1000) {
      return (roundedNum / 1000).toFixed(1) + "K";
    } else {
      return roundedNum.toString();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "12px",
      }}
      className="relative"
    >
      <Box
        className="z-0"
        sx={{
          position: "absolute",
          inset: "0",
          backgroundColor: "rgba(24, 119, 169, 0.10)",
          width: percent + "%",
        }}
      />
      <Box className="flex items-center gap-[6px]">
        {checked && (
          <CheckIcon
            className="mr-[6px]"
            sx={{ fontSize: "18px", color: "#1877A9" }}
          />
        )}

        <Typography
          fontSize="16.5px"
          fontWeight="400 !important"
          lineHeight={"120%"}
        >
          {type}
        </Typography>
        <Typography
          fontSize="16.5px"
          fontWeight="300"
          color={"text.secondary"}
          ml={checked ? 1 : 0}
          lineHeight={"120%"}
        >
          {formatNumber(amount)}
        </Typography>
      </Box>
      <Typography
        fontSize="16.5px"
        fontWeight="400 !important"
        ml="auto"
        color="rgba(16, 17, 27, 0.60)"
        sx={{
          color: "primary.main",
        }}
      >
        {percent}%
      </Typography>
    </Box>
  );
}
