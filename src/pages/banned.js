import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

const BannedPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Optionally, you can set a timeout to redirect to the home page after a few seconds
    const timer = setTimeout(() => {
      router.push("/main");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box className="text-center flex flex-col items-center justify-center gap-8 w-full my-[120px]">
      <Typography
        fontSize={{ mob: "28px", tab: "48px" }}
        fontWeight={"400 !important"}
        letterSpacing={"-0.48px"}
        lineHeight={"120%"}
        className="uppercase"
        color={"text.primary"}
      >
        Your Wallet address is banned.
      </Typography>
      <Typography
        fontSize={{ mob: "14px", tab: "18px" }}
        fontWeight={"400 !important"}
        letterSpacing={"-0.48px"}
        lineHeight={"120%"}
        color={"text.primary"}
      >
        You will be redirected to the home page shortly.
      </Typography>
    </Box>
  );
};

export default BannedPage;
