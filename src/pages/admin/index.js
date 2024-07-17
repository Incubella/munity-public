import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "@/utils/Loader";
import AdminNavigation from "@/components/settings/Admin/AdminNavigation";
import LoginToAdmin from "@/components/settings/Admin/Login";
import { useWeb3Context, addressEllipsis } from "@/utils";
import { formatDate } from "@/components/settings/Admin/CustomTable";
import { getUserOwnedAccessKey } from "@/components/settings/Profile";
import { verifySession } from "@/utils/session";
import withAuth from "@/utils/withAuth";
// const ethIcon = (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 20 20"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M5.7501 7.58343L9.72507 5.81676C9.90007 5.74176 10.1001 5.74176 10.2668 5.81676L14.2418 7.58343C14.5918 7.74176 14.9167 7.31676 14.6751 7.01676L10.5084 1.9251C10.2251 1.5751 9.75841 1.5751 9.47508 1.9251L5.30841 7.01676C5.07508 7.31676 5.4001 7.74176 5.7501 7.58343Z"
//       fill="#10111B"
//     />
//     <path
//       d="M5.74981 12.4166L9.73312 14.1833C9.90812 14.2583 10.1081 14.2583 10.2748 14.1833L14.2581 12.4166C14.6081 12.2583 14.9331 12.6833 14.6915 12.9833L10.5248 18.0749C10.2415 18.4249 9.7748 18.4249 9.49147 18.0749L5.3248 12.9833C5.0748 12.6833 5.39148 12.2583 5.74981 12.4166Z"
//       fill="#10111B"
//     />
//     <path
//       d="M9.81648 7.90825L6.3748 9.62492C6.06647 9.77492 6.06647 10.2166 6.3748 10.3666L9.81648 12.0833C9.93314 12.1416 10.0748 12.1416 10.1914 12.0833L13.6331 10.3666C13.9414 10.2166 13.9414 9.77492 13.6331 9.62492L10.1914 7.90825C10.0664 7.84992 9.93314 7.84992 9.81648 7.90825Z"
//       fill="#10111B"
//     />
//   </svg>
// );
const Admin = ({ initialUser }) => {
  const { theme, userAddress } = useSelector((state) => state.app);
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(!!initialUser);
  const [user, setUser] = useState(initialUser || null);
  const handleLogin = (status, userData) => {
    setIsLoggedIn(status);
    setUser(userData);
  };

  useEffect(() => {
    if (initialUser) {
      console.log("initialUser:", initialUser);

      setIsLoggedIn(true);
      setUser(initialUser);
    }
  }, [initialUser]);

  //======================== CONTRACT FUNCTIONS start =========================

  const {
    connected,
    getCommunityJoinedMembers,
    getCommunityDetailsById,
    getUserAllCommunitiesRegistered,
    chainId,
  } = useWeb3Context();
  //================================================================

  useEffect(() => {
    // If the user is not connected, redirect to the main page
    if (connected === false) {
      console.log("User is not connected", connected);
      // router.push("/main");
    } else {
      console.log("User is connected", connected);
    }
  }, [connected, router]);

  //======================== CONTRACT FUNCTIONS end =========================
  const [userData, setUserData] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const usersResponse = await fetch("/api/users");
        const communitiesResponse = await fetch("/api/communities");
        if (!usersResponse.ok || !communitiesResponse.ok)
          throw new Error("Failed to fetch data");
        const usersData = await usersResponse.json();
        const communitiesData = await communitiesResponse.json();

        const formattedUsersData = await Promise.all(
          usersData.data.map(async (user) => {
            let userCommunityFromWeb3 = await getUserAllCommunitiesRegistered(
              user.address,
              chainId
            );
            let userSubscriptionsData = await getUserOwnedAccessKey(
              user.address,
              chainId
            );
            console.log("userSubscriptionsData:", userSubscriptionsData);
            return {
              ...user,
              join_date: formatDate(user.join_date), // Assuming 'joinedIn' is the key holding the date string
              formatedAddress: addressEllipsis(user.address),
              subscriptions: userSubscriptionsData
                ? userSubscriptionsData.length
                : 0,
              userCommunityFromWeb3: userCommunityFromWeb3,
              userSubscriptionsData: userSubscriptionsData,
              communities: userCommunityFromWeb3.length,
            };
          })
        );

        // Use Promise.all to wait for all asynchronous operations to complete
        const formattedCommunitiesData = await Promise.all(
          communitiesData.data.map(async (community) => {
            const details = await getCommunityDetailsById(
              community.contract_community_id
            );
            const subscribers = await getCommunityJoinedMembers(
              community.contract_community_id,
              details.chainId
            );

            return {
              ...community,
              createdAt: formatDate(community.createdAt), // Assuming 'joinedIn' is the key holding the date string
              subscribers: subscribers.result.length, //subscribers.result.length
              subscribersData: subscribers.result, //subscribers.result
            };
          })
        );

        // console.log("formattedUsersData:", formattedUsersData);
        // console.log("communitiesData:", communitiesData.data);
        setUserData(formattedUsersData);
        setCommunityData(formattedCommunitiesData);
      } catch (error) {
        console.error("Fetching error:", error);
        setSnackbar({ open: true, message: error.message, severity: "error" });
      } finally {
        setLoading(false);
      }
    }
    if (chainId) fetchData();
  }, [chainId]);

  return (
    <Box>
      {!isLoggedIn ? (
        <LoginToAdmin onLogin={handleLogin} />
      ) : (
        <Box>
          <Box className="relative">
            <Loader open={loading} />

            <AdminNavigation
              userData={userData}
              communityData={communityData}
              getUserAllCommunitiesRegistered={getUserAllCommunitiesRegistered}
              chainId={chainId}
              setLoading={setLoading}
            />
          </Box>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{
              borderRadius: "0",
              backgroundColor: "#eaeaea",
            }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{
                width: "100%",
                borderRadius: "0",
                "&.MuiAlert-standardSuccess": { color: "rgb(30, 70, 32)" },
                color: "#ff3333",
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </Box>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  return {
    props: {
      initialUser: context.initialUser,
    },
  };
});

export default Admin;
