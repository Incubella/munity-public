import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Divider } from "@mui/material";
import BlueBtn from "../../Buttons/BlueBtn";
import PriceHistoryGraph from "./PriceHistoryGraph";
import AccordionContainer from "./AccordionContainer";
import TransactionHistory from "./TransactionHistory";
import SingleAttribute from "./SingleAttribute";
import VerifiedSharpIcon from "@mui/icons-material/VerifiedSharp";
import ReusableModal from "../../modal/ReusableModal";
import SellItemForm from "./SellItemForm";

const SingleNFT = () => {
  const [isVerified] = useState(true);
  const { theme } = useSelector((state) => state.app);
  // const svgFillColor = theme === "light" ? "#10111B" : "white";
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const Attributes = [
    {
      benefit: "Merch",
    },
    {
      benefit: "DAO Proposals",
    },
    {
      benefit: "Articles",
    },
    {
      benefit: "Files",
    },
    {
      benefit: "Giveaways",
    },
    {
      benefit: "Roadmap",
    },
    {
      benefit: "Social Posts",
    },
  ];

  return (
    <Box className="max-w-[1540px] mx-auto px-4 mob:mt-4 tab:mt-14 mob:mb-[52px] tab:mb-[120px]">
      <Box className="flex flex-wrap desk:flex-nowrap">
        {/* Left Column */}
        <Box className="w-full desk:max-w-[808px]">
          {/* NFT Image */}
          <Box
            className="desk:border-r desk:border-solid desk:pr-[52px] "
            sx={{ borderColor: "primary.border" }}
          >
            <img
              src={"/images/NFTDEVIMG.png"} // Replace 'placeholder-image-url' with an actual placeholder image URL
              alt="NFT"
              className={
                "w-full object-cover mob:max-w-[343px] lap:max-w-[738px] mob:h-[343px] lap:h-[738px] mob:mx-auto desk:mx-0"
              }
            />
            <Box className="mob:flex flex-col desk:hidden mob:mt-6 tab:mt-8">
              <Box className="max-w-[738px] mx-auto">
                {/* NFT Name */}
                <Typography
                  color={"text.primary"}
                  variant="h1"
                  className="mob:max-w-[270px] mob-sm:max-w-full"
                >
                  Iman Gadzhi Community key
                  {isVerified && (
                    <VerifiedSharpIcon
                      sx={{
                        fontSize: { mob: 25, tab: 34 },
                        color: "text.primary",
                        marginLeft: "16px",
                      }}
                    />
                  )}
                </Typography>

                {/* Mailing List */}
                <Typography
                  className="mob:!mt-4 tab:!mt-8"
                  fontSize={"16.5px"}
                  lineHeight={"120%"}
                  color={"text.secondary"}
                >
                  Join our mailing list to stay in the loop with our newest
                  feature releases, NFT drops, and tips and tricks for
                  navigating Munity.
                </Typography>
                <Box className="flex items-center mob:gap-6 tab:gap-8 flex-wrap mob:mt-6 tab:mt-8">
                  {/* Sell Your Item Button */}

                  <BlueBtn>Buy NFT</BlueBtn>
                  <BlueBtn handleClick={handleOpen}>Sell NFT</BlueBtn>
                </Box>
              </Box>

              {/* Attributes */}
              <AccordionContainer title={"ATTRIBUTES"} childrenStyles={"!px-0"}>
                <Stack
                  className="tab:gap-6 mob:gap-y-4"
                  sx={{ borderColor: "primary.border" }}
                  divider={
                    <Divider
                      orientation={"horizontal"}
                      flexItem
                      light
                      sx={{
                        background: "none",
                        borderColor: "primary.border",
                      }}
                      className="!mt-0"
                    />
                  }
                  direction={"column"}
                  spacing={0}
                >
                  {Attributes.map(({ benefit }) => (
                    <div key={benefit}>
                      <SingleAttribute key={benefit} benefit={benefit} />
                    </div>
                  ))}
                </Stack>
              </AccordionContainer>
            </Box>
          </Box>
          {/* Price History Graph */}
          <AccordionContainer
            title={"Price History"}
            parentStyles={"w-full desk:pr-[52px]"}
            accordionStyles={"desk:max-w-[738px]"}
          >
            <PriceHistoryGraph theme={theme} />
          </AccordionContainer>

          {/* <LoadMoreButton /> */}
        </Box>

        {/* Right Column */}
        <Box className="flex-col pl-[52px] mob:hidden desk:flex">
          {/* NFT Name */}
          <Typography variant="h1" color={"text.primary"}>
            The Bridged by Kiraverse
            {isVerified && (
              <VerifiedSharpIcon
                sx={{ fontSize: 34, color: "text.primary", marginLeft: "16px" }}
              />
            )}
          </Typography>

          {/* Mailing List */}
          <Typography
            className="mob:!mt-4 tab:!mt-8"
            fontSize={"16.5px"}
            lineHeight={"120%"}
            color={"text.secondary"}
          >
            Join our mailing list to stay in the loop with our newest feature
            releases, NFT drops, and tips and tricks for navigating Munity.
          </Typography>
          <Box className="flex items-center mob:gap-6 tab:gap-8 flex-wrap mob:mt-6 tab:mt-8">
            {/* Sell Your Item Button */}
            <BlueBtn>Buy NFT</BlueBtn>
            <BlueBtn handleClick={handleOpen}>Sell NFT</BlueBtn>
          </Box>

          {/* Attributes */}
          <AccordionContainer title={"ATTRIBUTES"} childrenStyles={"!px-0"}>
            <Stack
              className="tab:gap-6 mob:gap-y-4"
              sx={{ borderColor: "primary.border" }}
              divider={
                <Divider
                  orientation={"horizontal"}
                  flexItem
                  light
                  sx={{
                    background: "none",
                    borderColor: "primary.border",
                  }}
                  className="!mt-0"
                />
              }
              direction={"column"}
              spacing={0}
            >
              {Attributes.map(({ benefit }) => (
                <div key={benefit}>
                  <SingleAttribute key={benefit} benefit={benefit} />
                </div>
              ))}
            </Stack>
          </AccordionContainer>
        </Box>
      </Box>
      {/* Transaction History */}
      <AccordionContainer title={"TRANSACTION HISTORY"}>
        <TransactionHistory />
      </AccordionContainer>
      <ReusableModal
        isOpen={modalOpen}
        handleClose={handleClose}
        title="Sell your item"
      >
        <SellItemForm theme={theme} type="sell" />
      </ReusableModal>
    </Box>
  );
};

export default SingleNFT;
