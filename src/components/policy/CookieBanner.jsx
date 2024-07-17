// components/CookieBanner.js
import { useState, useEffect } from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import BlueBtn from "../Buttons/BlueBtn";
import Cookies from "js-cookie";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("consent", "true", { expires: 365 });
    setShowBanner(false);
  };

  return (
    showBanner && (
      <Box className="fixed bottom-0 left-0 right-0 bg-white p-4 text-[#10111B] flex flex-col md:flex-row justify-between items-center z-[99999]">
        <Typography variant="body1" className="mb-2 md:mb-0">
          We use cookies to improve your experience. By using our site, you
          agree to our use of cookies.{" "}
          <Link href="/cookie-policy" className="underline text-[#1877A9]">
            Learn more
          </Link>
        </Typography>
        <BlueBtn handleClick={handleAccept} classNames="!capitalize">
          Accept All Cookies
        </BlueBtn>
      </Box>
    )
  );
};

export default CookieBanner;
