"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Loader from "@/utils/Loader";

//Sections
import Hero from "./Hero";
import Categories from "./Categories/Categories";
import Popular from "./Popular";
import Users from "./Users/Users";
import { useWeb3Context } from "@/utils";

export default function MainApp() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { allCommunitiesMain, allCommunitiesMainLoading, chainId } =
    useWeb3Context();
  console.log("allCommunitiesMainnnnnnn:", allCommunitiesMain);
  const [communityDatabase, setCommunityData] = useState([]);
  const [usersDatabase, setUsersData] = useState([]);
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/communities");
        if (!response.ok) {
          throw new Error("Failed to fetch communities");
        }
        const data = await response.json();
        setCommunityData(data.data); // Assuming your API returns an array of communities
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsersData(data.data); // Update your state with the fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // fetchCommunities();
  }, []);

  const communityData = {
    name: "Grow your Agency",
    communityImg: "/images/profileBanner.png",
    owner: "Imangadzhi",
    ownerURL: "/profile",
    Url: "/community",
    slots: "204",
    verified: true,
  };
  const categoryData = [
    {
      name: "Trending",
      link: "/community/category/trending",
      communityQuantity: "1.2M",
      categoryIMG: "/images/CategoryTrending.png",
    },
    {
      name: "Top",
      link: "/community/category/top",
      communityQuantity: "1.6M",
      categoryIMG: "/images/CategoryClone.png",
    },
    {
      name: "Art",
      link: "/community/category/art",
      communityQuantity: "2.2M",
      categoryIMG: "/images/CategoryArt.png",
    },
    {
      name: "Games",
      link: "/community/category/games",
      communityQuantity: "3.5M",
      categoryIMG: "/images/CategoryGames.png",
    },
    {
      name: "Music",
      link: "/community/category/music",
      communityQuantity: "1.4M",
      categoryIMG: "/images/CategoryMusic.png",
    },
    {
      name: "Photography",
      link: "/community/category/photography",
      communityQuantity: "2.1M",
      categoryIMG: "/images/CategoryPhotography.png",
    },
    {
      name: "Collectibles",
      link: "/community/category/collectibles",
      communityQuantity: "1.2M",
      categoryIMG: "/images/CategoryCollectibles.png",
    },
    {
      name: "Virtual World",
      link: "/community/category/virtual-world",
      communityQuantity: "5.3M",
      categoryIMG: "/images/CategoryVirtualWorld.png",
    },
  ];

  // console.log("testtttttttttttttttt",{loading,allCommunitiesMainLoading})
  return (
    <Box className="mob:mb-[48px] tab:mb-[80px] lap:mb-[120px]">
      <Loader open={loading || allCommunitiesMainLoading} />
      <Hero communityData={communityData} navigate={router} />
      <Categories categoryData={categoryData} navigate={router} />
      <Popular
        sectionTitle={"ALL COMMUNITIES"}
        sectionNum={"02."}
        popularsData={allCommunitiesMain}
        // popularsData={communityDatabase}
      />
      {/* <Popular
        sectionTitle={"POPULAR COMMUNITIES"}
        sectionNum={"03."}
        popularsData={popularsData}
      /> */}
      <Users usersData={usersDatabase} />
      {/* <Popular
        sectionTitle={"CATEGORY: GAMING"}
        sectionNum={"05."}
        popularsData={categoryGamingData}
      /> */}
    </Box>
  );
}
