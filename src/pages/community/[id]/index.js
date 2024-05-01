import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import SideBarContent from "../../../components/LiveChat/SideBarContent";
import SideBar from "../../../components/sidebar";
import styles from "../community.module.scss";
import Userprofile from "../../../components/community/userprofile";
import Banner from "../../../components/community/communityBG/Banner";
import { useWeb3Context } from "@/utils";
import { useParams } from "next/navigation";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ReusableModal from "@/components/modal/ReusableModal";
import SellItemForm from "@/components/settings/NotMinted/SellItemForm";
import Loader from "@/utils/Loader";
import { formatDate } from "@/utils/helpers";

const SingleCommunityPage = () => {
  const {
    getCommunityDetailsById,
    getCommunityJoinedMembers,
    getUserCommunityBalance,
    address,
    chainId,
    connected,
  } = useWeb3Context();
  const [areNFTs, setAreNfts] = useState(false);

  const [backendcommunityData, setBackendCommunityData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [creatorData, setCreatorData] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [communityDataContract, setCommunityDataContract] = useState(null);
  const [userCommunityBalance, setUserCommunityBalance] = useState({
    id: null,
    balance: "0",
  });

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query; // Retrieve the community ID from the URL
  const { theme } = useSelector((state) => state.app);
  const [modalOpen, setModalOpen] = useState(false);
  const isCreatorOfThisCommunity =
    connected &&
    communityDataContract &&
    address.toLowerCase() === communityDataContract.by.toLowerCase();
  useEffect(() => {
    // console.log("Usernavigation",userCommunityBalance);
    if (Number(userCommunityBalance.balance) > 0 || isCreatorOfThisCommunity) {
      setAreNfts(true);
    } else {
      setAreNfts(false);
    }
  }, [userCommunityBalance]);
  useEffect(() => {
    // If the id is declared, redirect to the main page
    if (!id) {
      console.log("You can't access this page without id");
      // router.push("/main");
    } else {
      // setLoading(false);
      console.log("this is single page of:", id);
    }
  }, [id, router]);

  const params = useParams();
  console.log("SingleCommunityPage", params);
  useEffect(() => {
    setCurrentId(params ? params.id : null);
  }, [params]);

  useEffect(() => {
    // Define the function inside useEffect
    const fetchCommunityCreatorData = async (creatorId) => {
      try {
        const response = await fetch(`/api/users/${creatorId}`);
        const data = await response.json();
        setCreatorData(data.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    const fetchCommunityDataFromBackend = async (currentId) => {
      try {
        const response = await fetch(`/api/communities/contract/${currentId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBackendCommunityData(data.data);
        console.log("backend community data:", data);
        return data.data;
      } catch (error) {
        console.error("Failed to fetch community data:", error);
      }
    };
    const fetchCommunityData = async (currentId) => {
      try {
        setLoading(true);
        const data2 = await getCommunityDetailsById(currentId);
        const dataBackend = await fetchCommunityDataFromBackend(currentId);
        await fetchCommunityCreatorData(dataBackend.user_id);
        console.log("ddsdsdsdsdsd currentId", currentId, data2);
        const joinedDate = dataBackend.createdAt
          ? formatDate(dataBackend.createdAt)
          : formatDate(new Date());
        if (data2 !== null) {
          const joinedUsers = await getCommunityJoinedMembers(
            currentId,
            data2.chainId
          );
          console.log("joined users:", joinedUsers);
          const communityData = {
            communityId: currentId,
            name: data2
              ? data2.communityData?.name
              : dataBackend
              ? dataBackend.name
              : "",
            chain: data2.chainId,
            category: dataBackend.category
              ? dataBackend.category
              : "D.Finances",
            joinedDate: joinedDate,
            community_avatar: data2.communityData?.avatarImage,
            communityIMG: data2.communityData?.image,
            communityIMGBanner: data2.communityData?.bannerImage,
            users: joinedUsers ? joinedUsers.result.length : "--",
            by: data2 ? data2.creator : "ImanGadzhi",
            slotsLeft: data2 ? data2.supply : null,
            isVerified: dataBackend.is_verified,
            about: [
              data2
                ? data2.communityData?.description
                : dataBackend?.description,
            ],
          };

          setCommunityDataContract(communityData);
          // setLoading(false);
        }
      } catch (error) {
        // setLoading(false);

        console.error("Failed to fetch community data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    if (currentId != null && chainId != "") {
      fetchCommunityData(currentId);
    }
  }, [currentId, chainId]);

  useEffect(() => {
    if (communityDataContract != null && address != "") {
      (async () => {
        const balance = await getUserCommunityBalance(address, currentId);
        setUserCommunityBalance({ id: currentId, balance });
      })();
    }
    // console.log(communityDataContract&&communityDataContract)
  }, [communityDataContract, address]);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  // useEffect(() => {
  //   // Define the function inside useEffect
  //   if (currentId) {
  //     console.log(currentId);
  //     const fetchCommunityData = async () => {
  //       try {
  //         const response = await fetch(`/api/communities/contract/${currentId}`);
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         const data = await response.json();
  //         console.log("data:", data);
  //         setCommunityData(data.data);
  //       } catch (error) {
  //         console.error("Failed to fetch community data:", error);
  //       }
  //     };

  //     // Call the function
  //     fetchCommunityData();
  //   }
  // }, [currentId]);
  useEffect(() => {
    const getCurrentUserByAddress = async () => {
      try {
        const API_URL = `/api/users?address=${address}`; // Adjust based on your API endpoint
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        console.log("user was found in single:", data.data);
        setUserData(data.data);
        return data.data; // Assuming the response includes user data under a 'user' key
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (address) getCurrentUserByAddress();
  }, [address]);
  const channels = [
    { title: "Articles", badge: 2 },
    { title: "Upcoming Events", badge: 150 },
    { title: "Great news", badge: 200 },
    { title: "DAO Proposals", badge: 0 },
  ];

  const communityBackground = "/images/profileBanner.png";

  return (
    <Box>
      <Loader open={loading} />

      <Box className={styles["container"]}>
        {communityDataContract !== null ? (
          <>
            <Box className={styles["main"] + " relative overflow-hidden"}>
              <Banner bannerIMG={communityDataContract?.communityIMGBanner} />
              <Userprofile
                communityDatabase={backendcommunityData}
                communityDataContract={communityDataContract}
                userCommunityBalance={userCommunityBalance}
                handleOpenBuyForm={handleOpen}
                areNFTs={areNFTs}
                isCreatorOfThisCommunity={isCreatorOfThisCommunity}
                creatorData={creatorData}
                setLoading={setLoading}
              />
            </Box>

            <SideBar areNFTs={areNFTs}>
              <SideBarContent
                title={"General"}
                chats={channels}
                userData={userData}
                address={address}
              />
            </SideBar>
            <ReusableModal
              isOpen={modalOpen}
              handleClose={handleClose}
              title="MINT NFT"
            >
              <SellItemForm
                theme={theme}
                type="buy"
                tokenId={currentId}
                setLoading={setLoading}
                backendcommunityData={backendcommunityData}
                creatorData={creatorData}
              />
            </ReusableModal>
          </>
        ) : (
          <Box className="w-full">
            <Typography
              variant="h3"
              sx={{
                color: "primary.main",
                fontSize: {
                  mob: "20px",
                  lap: "30px",
                  desk: "44px",
                },
              }}
              className="lap:!mb-[52px] mob:!mb-6 lap:!mt-[152px] tab:!mt-[52px] mob:!mt-6 text-center"
            >
              Community Not Found
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SingleCommunityPage;
