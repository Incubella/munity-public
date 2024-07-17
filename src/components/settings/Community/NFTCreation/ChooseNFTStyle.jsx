import React from "react";
import { Typography, Box } from "@mui/material";
import NFTCard from "./NFTCard";

const ChooseNFTStyle = ({ handleNext }) => {
  return (
    <Box>
      <Typography
        sx={{
          color: "text.secondary07",
          fontSize: {
            mob: "16.5px",
            tab: "18px",
          },
          fontWeight: "400 !important",
          lineHeight: "normal",
        }}
        className="mob:!mb-[32px] tab:!mb-[52px] !mt-8"
        align="center"
      >
        Please choose an option to continue.
      </Typography>
      <Box className="flex justify-center flex-wrap mob:gap-4 tab:gap-6 tab:px-8">
        <Box>
          <NFTCard
            title={"Single Shape Image"}
            text={"Choose this if you want to create a single item."}
            BtnText={"Create Single"}
            onClick={() => handleNext()}
          />
        </Box>
        {/* Multiple Shape Image */}

        {/* Stack of Multiple Shape Image Cards */}
        {/* <Box className="relative mob:hidden tab:block">
          {[...Array(3)].map((_, index) => (
            <Box
              key={index}
              sx={{
                position: index !== 0 ? "absolute" : "relative",
                left: index === 1 ? "15px" : index === 2 && "30px",
                top: index === 1 ? "10px" : index === 2 && "20px",
                zIndex: index === 0 ? 2 : index === 1 ? 1 : 0,
              }}
            >
              <NFTCard
                title={"Multiple Shape Image"}
                text={"Choose this if you want to create multiple items."}
                BtnText={"Create Multiple"}
                onClick={() => handleNext(true)}
              />
            </Box>
          ))}
        </Box>
        <Box className="mob:block tab:hidden">
          <NFTCard
            title={"Multiple Shape Image"}
            text={"Choose this if you want to create multiple items."}
            BtnText={"Create Multiple"}
            onClick={() => handleNext(true)}
          />
        </Box> */}
      </Box>
    </Box>
  );
};

export default ChooseNFTStyle;
