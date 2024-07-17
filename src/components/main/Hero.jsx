import { useState, useEffect } from "react";
import { Box, Typography, Link } from "@mui/material";
import BlueBtn from "../Buttons/BlueBtn";
import { useWeb3Context } from "@/utils";

import VerifiedSharpIcon from "@mui/icons-material/VerifiedSharp";
import { fetchCommunityCreatorData } from "@/pages/community/[communityName]/[id]";
export default function Hero({ navigate, herocCommunityData, setLoading }) {
  const [communityData, setCommunityData] = useState(herocCommunityData || {});
  const {
    getCommunityDetailsById,
    // getCommunityJoinedMembers,
    // getUserCommunityBalance,
    chainId,
  } = useWeb3Context();
  function handleClickCommunity() {
    navigate.push(
      "community/" +
        herocCommunityData.name +
        "/" +
        herocCommunityData.contract_community_id
    );
  }

  useEffect(() => {
    const fetchCommunityData = async (currentId) => {
      try {
        setLoading(true);
        const data2 = await getCommunityDetailsById(currentId);
        const creatorData = await fetchCommunityCreatorData(
          herocCommunityData.user_id
        );
        console.log("ddsdsdsdsdsd currentId", currentId, data2);
        if (data2 !== null) {
          setCommunityData({
            communityId: currentId,
            name: data2
              ? data2.communityData?.name
              : communityData
              ? herocCommunityData.name
              : "",
            chain: data2.chainId,
            community_avatar: data2.communityData?.avatarImage,
            communityIMG: data2.communityData?.image,
            communityIMGBanner: data2.communityData?.bannerImage,
            by: creatorData?.username,
            slotsLeft: data2 ? data2.supply : null,
            isVerified: herocCommunityData?.is_verified,
            about: data2
              ? data2.communityData?.description
              : herocCommunityData?.description,
          });
        }
      } catch (error) {
        console.error("Failed to fetch community data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    if (
      herocCommunityData != null &&
      herocCommunityData?.contract_community_id &&
      chainId != ""
    ) {
      fetchCommunityData(herocCommunityData.contract_community_id);
    }
  }, [herocCommunityData, chainId]);
  return (
    <Box className="max-w-[1451px] mx-auto px-4 mob:mt-4 tab:mt-8 lap:mt-14 mob:mb-8 tab:mb-[70px] lap:mb-[120px] flex flex-wrap desk:flex-nowrap">
      {/* NFT Image */}
      <Box
        className="desk:border-r desk:border-solid desk:pr-[52px] w-full desk:max-w-[808px]"
        sx={{ borderColor: "primary.border" }}
      >
        <img
          src={communityData?.community_avatar}
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
          sx={{ wordBreak: "break-all" }}
        >
          {communityData?.name}
          {communityData?.is_verified && (
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
            onClick={() =>
              navigate.push(`/profile/${herocCommunityData?.user_id}`)
            }
            sx={{ color: "#1877A9" }}
            className="mob:!mr-4 tab:!mr-6 !ml-[6px] cursor-pointer"
          >
            {communityData?.by}
          </Link>
          {communityData?.slotsLeft} open slots
        </Typography>

        {/* Mailing List */}
        <Typography
          className="mob:!mt-4 tab:!mt-8"
          fontSize={"16.5px"}
          lineHeight={"120%"}
          color={"text.secondary"}
        >
          {communityData?.about}
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
