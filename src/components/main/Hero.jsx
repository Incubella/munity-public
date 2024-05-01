import { Box, Typography, Link } from "@mui/material";
import BlueBtn from "../Buttons/BlueBtn";
import VerifiedSharpIcon from "@mui/icons-material/VerifiedSharp";

export default function Hero({ navigate, communityData }) {
  function handleClickCommunity() {
    navigate.push(communityData.Url);
  }
  return (
    <Box className="max-w-[1451px] mx-auto px-4 mob:mt-4 tab:mt-8 lap:mt-14 mob:mb-8 tab:mb-[70px] lap:mb-[120px] flex flex-wrap desk:flex-nowrap">
      {/* NFT Image */}
      <Box
        className="desk:border-r desk:border-solid desk:pr-[52px] w-full desk:max-w-[808px]"
        sx={{ borderColor: "primary.border" }}
      >
        <img
          src={communityData?.communityImgUri??communityData.communityImg}
          alt="NFT"
          className={
            "w-full object-cover lap:max-w-[738px] mob:h-[232px] tab:h-auto lap:h-[473px] mob:mx-auto desk:mx-0"
          }
        />
      </Box>
      <Box className="lap:max-w-[738px] desk:max-w-[593px] mx-auto desk:pl-[52px] mob:mt-4 tab:mt-6 desk:mt-0">
        {/* NFT Name */}
        <Typography
          variant="h1"
          color={"text.primary"}
          className="mob:max-w-[270px] mob-sm:max-w-full"
        >
          {communityData.name}
          {communityData.verified && (
            <VerifiedSharpIcon
              sx={{
                fontSize: { mob: 25, tab: 34 },
                color: "text.primary",
                marginLeft: "16px",
              }}
            />
          )}
        </Typography>
        <Typography
          className="mob:!mt-4 tab:!mt-6"
          fontSize={"18px"}
          lineHeight={"normal"}
          fontWeight={"400 !important"}
          color={"text.primary"}
        >
          BY
          <Link
            href={communityData.ownerURL}
            sx={{ color: "#1877A9" }}
            className="mob:!mr-4 tab:!mr-6 !ml-[6px]"
          >
            {communityData.owner}
          </Link>
          {communityData.slots} open slots
        </Typography>

        {/* Mailing List */}
        <Typography
          className="mob:!mt-4 tab:!mt-8"
          fontSize={"16.5px"}
          lineHeight={"120%"}
          color={"text.secondary"}
        >{
          communityData.description?
          communityData.description
          :"Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Munity."
        }
          
        </Typography>
        <Box className="flex items-center mob:gap-6 tab:gap-8 flex-wrap mob:mt-6 tab:mt-8">
          <BlueBtn handleClick={handleClickCommunity} classNames="!capitalize">
            View Community
          </BlueBtn>
        </Box>
      </Box>
    </Box>
  );
}
