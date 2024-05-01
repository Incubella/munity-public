import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import SettingsNav from "../../../components/settings/Navigation";
import { useParams } from "next/navigation";
import { useWeb3Context } from "@/utils";
import SettingsNavSingle from "@/components/settings/NavigationSingle";

export default function Settings() {
  const { theme } = useSelector((state) => state.app);
  const { chainId, address, getCommunityDetailsById } = useWeb3Context();
  const params = useParams();

  const [currentId, setCurrentId] = useState(null);
  const [communityDataContract, setCommunityDataContract] = useState(null);
  const [loading, setloading] = useState(true);
  const [isAddressCreator, setIsAddressCreator] = useState(false);

  useEffect(() => {
    console.log("SingleCommunityPage", params);
    setCurrentId(params ? params.id : null);
  }, [params]);

  const fetchCommunityData = async (currentId) => {
    // console.log("HItttttttttttttttttt", currentId);
    try {
      setloading(true);
      const _communityDetails = await getCommunityDetailsById(currentId);
      // console.log("ddsdsdsdsdsd currentId", currentId, _communityDetails);
      
      if (_communityDetails !== null) {
        setIsAddressCreator(
          _communityDetails.creator.toLowerCase() === address.toLowerCase()
        );
       

        setCommunityDataContract(_communityDetails);
        // setloading(false);
      }
    } catch (error) {
      // setloading(false)

      console.error("Failed to fetch community data:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    // Define the function inside useEffect

    // Call the function
    // console.log({ currentId, chainId, address });
    if (currentId != null && chainId != "" && address != "") {
      fetchCommunityData(currentId);
    }
  }, [currentId, chainId, address]);

  const refetchData = async () => {
    if (currentId != null && chainId != "" && address != "") {
      fetchCommunityData(currentId);
    }
  };

  // if (!creatorCommunityData) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Box>
      <Box>
        <Box className=" relative overflow-hidden">
          {!loading ? (
            communityDataContract ? (
              isAddressCreator ? (
                <SettingsNavSingle
                  theme={theme}
                  communityDataContract={communityDataContract}
                  refetchData={refetchData}
                />
              ) : (
                <Box> Please connect community creator wallet...</Box>
              )
            ) : (
              <Box> No community found</Box>
            )
          ) : (
            <Box> Loading...</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
