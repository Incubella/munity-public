import { useRouter } from "next/router";
import { Box, Typography, Button } from "@mui/material";
// import Image from "next/image";
import CustomCard from "@/components/CustomCard";
import {  useWeb3Context } from "@/utils";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function NoNFTs({userCommunityBalance,handleOpenBuyForm,areNFTs}) {

  const {getCommunityDetailsById,address } = useWeb3Context()
  const router = useRouter();
const [data,setData] = useState(null)
  useEffect(()=>{

    if(userCommunityBalance.id !== null && address) {  

    (async()=>{
        const res = await getCommunityDetailsById(userCommunityBalance?.id)
        setData(res)
        console.log(res,areNFTs)
      })()
    } 

  },[userCommunityBalance?.id])
  return (
    <Box
      sx={{
        transform: "translateX(-50%)",
        backgroundColor: "primary.reversed",
      }}
      className="absolute top-28 left-1/2 z-20 w-full h-full lap:max-w-[892px] lap:max-h-[536px] tab:max-w-[550px] mob:max-w-[310px] mob:max-h-[637px] lap:p-16 mob:p-4 text-center flex items-center justify-center flex-col"
    >
      {/* Image */}

      {/* <Image
        src={"/images/NonftsLight.png"}
        alt="no access"
        className="w-full lap:max-w-[500px] mob:max-w-[200px] h-auto lap:mb-8 mob:mb-4"
        width={500}
        height={400}
      /> */}

      {/* Text */}
      <Typography
        variant="h3"
        sx={{ color: "primary.main" }}
        className="lap:!mb-[52px] mob:!mb-6"
      >
        You don’t own the NFT to access this community
      </Typography>
      <CustomCard
        page="noData"
        title={data?.communityData?.name}
        price={data && `${ethers.formatEther(data?.price)} ETH`}
        lastSale={data && ethers.formatEther(data?.price)}
        cardImg={data?.communityData?.image}
        buttonText="Check opensea"
        titleFontSize="18px"
        onClick={() => handleOpenBuyForm()}
        cardClassNames="!grid mob:gap-[4px] lap:gap-6 max-w-[576px]"
        cardSX={{ gridTemplateColumns: { lap: "1fr 1fr", mob: "1fr" } }}
        link={true}
        imgCss={"max-w-[276px] max-h-[276px]"}
      />
    </Box>
  );
}
