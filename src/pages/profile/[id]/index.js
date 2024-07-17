/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Banner from "@/components/community/communityBG/Banner";
import Profile from "@/components/Profile/Profile";
import Loader from "@/utils/Loader";
import { useWeb3Context } from "@/utils";
export default function ProfilePage() {
  const {
    addressCommunitiesData,
    addressCommunitiesDataLoading,
    chainId,
    getUserAllCommunitiesRegistered,
  } = useWeb3Context();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [communities, setCommunities] = useState([]);
  const router = useRouter();
  const { id } = router.query; // Retrieve the user ID from the URL
  // console.log(
  //   "addressCommunitiesDataaaaaaaaaaaaaaaaaaaa:",
  //   addressCommunitiesData
  // );
  useEffect(() => {
    // console.log("user id from router:", id);
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        if (!data.success) router.push("/main");
        console.log("user was Found");
        await getUserAllCommunitiesRegistered(data.data.address, chainId);

        setUserData(data.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id && chainId != "") {
      fetchUserData();
    }
  }, [id, chainId]);
  useEffect(() => {
    setCommunities(addressCommunitiesData);
  }, [addressCommunitiesData]);

  return (
    <Box className="relative overflow-hidden">
      <Loader open={loading} />
      <Banner
        bannerIMG={userData.user_banner || "/images/defaultBanner.jpg"}
        height="320px"
      />
      <Profile userData={userData} userCommunities={communities} />
    </Box>
  );
}
