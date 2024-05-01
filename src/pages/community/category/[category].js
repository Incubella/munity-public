import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import styles from "../community.module.scss";
import Loader from "@/utils/Loader";
import Popular from "@/components/main/Popular";
import { useWeb3Context } from "@/utils";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);

  const [communityData, setCommunityData] = useState([]);
  const router = useRouter();
  const { category } = router.query;
  const { getCommunityDetailsById, getCommunityJoinedMembers } =
    useWeb3Context();
  useEffect(() => {
    // Define the function inside useEffect
    const fetchCommunityData = async () => {
      try {
        const url = `/api/communities?category=${category}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Fetch additional details for each community
        const detailsPromises = data.data.map(async (community) => {
          console.log("community:", community);
          const details = await getCommunityDetailsById(
            community.contract_community_id
          );
          const members = await getCommunityJoinedMembers(
            community.contract_community_id,
            details.chainId
          );
          console.log("details:", details, "members:", members);
          return {
            ...community,
            title: community.name, // Convert name to title
            slotsLeft: details.supply, // Assuming these properties exist
            users: members ? members.result.length : "0",
          };
        });

        const modifiedData = await Promise.all(detailsPromises);
        console.log("modifiedData:", modifiedData);
        setCommunityData(modifiedData);
      } catch (error) {
        console.error("Failed to fetch community data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    if (category) fetchCommunityData();
  }, [category]); // Empty dependency array means this effect will only run once, similar to componentDidMount

  return (
    <Box className="container mx-auto px-4 my-[120px]">
      <Loader open={loading} />
      <Box>
        <Popular
          sectionTitle={`CATEGORY: ${category}`}
          // sectionNum={"05."}
          popularsData={communityData}
        />
      </Box>
    </Box>
  );
};

export default CategoryPage;
