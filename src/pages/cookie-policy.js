// pages/cookie-policy.js
import { Box, Typography } from "@mui/material";

const CookiePolicy = () => {
  return (
    <Box
      className="p-6 max-w-[840px] mx-auto my-[80px]"
      sx={{ color: "text.primary" }}
    >
      <Typography variant="h4" gutterBottom>
        Cookie Policy
      </Typography>
      <Typography variant="body1" gutterBottom className="mb-8">
        Our website uses cookies to improve user experience, analyze site usage,
        and assist in our marketing efforts. By clicking "Accept All Cookies",
        you agree to the storing of cookies on your device. You can manage your
        cookie settings by clicking "Cookie Settings".
      </Typography>
      <Typography variant="h5" gutterBottom>
        Types of Cookies We Use
      </Typography>
      <Typography variant="body1" gutterBottom>
        - <strong>Essential Cookies:</strong> Necessary for the website to
        function properly.
      </Typography>
      <Typography variant="body1" gutterBottom>
        - <strong>Analytics Cookies:</strong> Help us understand how visitors
        interact with our site.
      </Typography>
      <Typography variant="body1" gutterBottom>
        - <strong>Marketing Cookies:</strong> Used to track visitors across
        websites to display relevant ads.
      </Typography>
    </Box>
  );
};

export default CookiePolicy;
