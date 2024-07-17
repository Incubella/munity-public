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

  const {
    allCommunitiesMain,
    allCommunitiesMainLoading,
    partialCommunities,
    chainId,
  } = useWeb3Context();
  const [communityDatabase, setCommunityData] = useState([]);
  const [usersDatabase, setUsersData] = useState([]);
  const [featuredCommunity, setFeaturedCommunity] = useState(null);
  const [popularsData, setPopularsData] = useState([...allCommunitiesMain]);
  const [categoryQuantities, setCategoryQuantities] = useState({});

  useEffect(() => {
    const fetchCategoryQuantities = async () => {
      try {
        const response = await fetch("/api/communities/communitiesQuantity");
        if (!response.ok) {
          throw new Error("Failed to fetch category quantities");
        }
        const data = await response.json();
        setCategoryQuantities(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryQuantities();
  }, []);

  // console.log("categoryQuantities:", categoryQuantities);

  useEffect(() => {
    // console.log("allCommunitiesMainallCommunitiesMain:", allCommunitiesMain);
    setPopularsData(allCommunitiesMain);
  }, [allCommunitiesMain]);

  useEffect(() => {
    // console.log("partialCommunities:", allCommunitiesMain);
    setPopularsData(partialCommunities);
  }, [partialCommunities]);

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

    const fetchFeaturedCommunity = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/communities/feature");
        if (!response.ok) {
          throw new Error("Failed to fetch featured community");
        }
        const data = await response.json();
        console.log("featuredCommunity:", data);
        setFeaturedCommunity(data.community);
      } catch (error) {
        console.error("Error fetching featured community:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    fetchFeaturedCommunity();
    // fetchCommunities();
  }, []);

  const categoryData = [
    // {
    //   name: "Trending",
    //   link: "/community/category/trending",
    //   communityQuantity: categoryQuantities["trending"] || "0",
    //   categoryIMG: "/images/CategoryTrending.png",
    // },
    // {
    //   name: "Top",
    //   link: "/community/category/top",
    //   communityQuantity: categoryQuantities["top"] || "0",
    //   categoryIMG: "/images/CategoryClone.png",
    // },
    {
      name: "Art",
      link: "/community/category/art",
      communityQuantity: categoryQuantities["art"] || "0",
      categoryIMG: "/images/CategoryArt.png",
    },
    {
      name: "Games",
      link: "/community/category/games",
      communityQuantity: categoryQuantities["games"] || "0",
      categoryIMG: "/images/CategoryGames.png",
    },
    {
      name: "Music",
      link: "/community/category/music",
      communityQuantity: categoryQuantities["music"] || "0",
      categoryIMG: "/images/CategoryMusic.png",
    },
    {
      name: "Photography",
      link: "/community/category/photography",
      communityQuantity: categoryQuantities["photography"] || "0",
      categoryIMG: "/images/CategoryPhotography.png",
    },
    {
      name: "Collectibles",
      link: "/community/category/collectibles",
      communityQuantity: categoryQuantities["collectibles"] || "0",
      categoryIMG: "/images/CategoryCollectibles.png",
    },
    {
      name: "Virtual World",
      link: "/community/category/virtual-world",
      communityQuantity: categoryQuantities["virtual world"] || "0",
      categoryIMG: "/images/CategoryVirtualWorld.png",
    },
  ];

  return (
    <Box className="mob:mb-[48px] tab:mb-[80px] lap:mb-[120px]">
      <Loader open={loading || allCommunitiesMainLoading} />
      <Hero
        herocCommunityData={featuredCommunity}
        navigate={router}
        setLoading={setLoading}
      />
      <Categories categoryData={categoryData} navigate={router} />
      <Popular
        sectionTitle={"ALL COMMUNITIES"}
        sectionNum={"02."}
        popularsData={popularsData}
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
