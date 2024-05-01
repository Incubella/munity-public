/* eslint-disable import/no-anonymous-default-export */
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import ChangeImage from "./ChangeImage";
import LinkAccount from "./LinkAccounts/LinkAccount";
import SettingsBox from "../SettingsBoxMain";
import CustomForm from "../CustomForm";
import LoadmoreShowLess from "@/components/LoadmoreShowLess";
import CustomCard from "@/components/CustomCard";
import Moralis from "moralis";
import {
  GET_MARKETPALCE_URL,
  MUNITY_CONFIG,
  availableChains,
  useWeb3Context,
} from "@/utils";
import { useEffect, useState } from "react";
import { getResponseFromUri } from "@/utils/pinata/tools";

const twitchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
  >
    <path
      d="M36.6722 9.70031H33.0506V19.9847H36.6722V9.70031ZM26.7187 9.65625H23.0972V19.9453H26.7187V9.65625ZM11.3278 0L2.27906 8.57063V39.4294H13.1381V48L22.1878 39.4294H29.43L45.7209 24V0H11.3278ZM42.1003 22.2891L34.8609 29.1441H27.6197L21.2822 35.1441V29.1441H13.1381V3.42938H42.1003V22.2891Z"
      fill="#A970FF"
    />
  </svg>
);
const twitterIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
  >
    <path
      d="M15.095 43.5014C33.2083 43.5014 43.1155 28.4946 43.1155 15.4809C43.1155 15.0546 43.1155 14.6303 43.0867 14.2079C45.0141 12.8138 46.6778 11.0877 48 9.11033C46.2028 9.90713 44.2961 10.4294 42.3437 10.6598C44.3996 9.42915 45.9383 7.49333 46.6733 5.21273C44.7402 6.35994 42.6253 7.16838 40.4198 7.60313C38.935 6.02428 36.9712 4.97881 34.8324 4.6285C32.6935 4.27818 30.4988 4.64256 28.5879 5.66523C26.677 6.68791 25.1564 8.31187 24.2615 10.2858C23.3665 12.2598 23.1471 14.4737 23.6371 16.5849C19.7218 16.3885 15.8915 15.371 12.3949 13.5983C8.89831 11.8257 5.81353 9.33765 3.3408 6.29561C2.08146 8.4636 1.69574 11.0301 2.2622 13.4725C2.82865 15.9148 4.30468 18.0495 6.38976 19.4418C4.82246 19.3959 3.2893 18.9731 1.92 18.2092V18.334C1.92062 20.6077 2.7077 22.8112 4.14774 24.5707C5.58778 26.3303 7.59212 27.5375 9.8208 27.9878C8.37096 28.3832 6.84975 28.441 5.37408 28.1567C6.00363 30.1134 7.22886 31.8244 8.87848 33.0506C10.5281 34.2768 12.5197 34.9569 14.5747 34.9958C12.5329 36.6007 10.1946 37.7873 7.69375 38.4878C5.19287 39.1882 2.57843 39.3886 0 39.0777C4.50367 41.9677 9.74385 43.5007 15.095 43.4937"
      fill="#1C9AEF"
    />
  </svg>
);

const linkedAccounts = [
  {
    label: "Twitch",
    icon: twitchIcon,
    isConnected: true,
  },
  {
    label: "Twitter",
    icon: twitterIcon,
    isConnected: true,
  },
];

const personalInformationFormConfig = [
  { label: "First Name", name: "first_name", type: "text" },
  { label: "Last Name", name: "last_name", type: "text" },
  { label: "Username", name: "username", type: "text" },
  { label: "E-mail", name: "email", type: "text" },
  {
    label: "About",
    name: "about",
    type: "textarea",
    placeholder: "Write about you here..",
    rowSpan: true,
  },
];

export default function Profile({ userAddress, setLoading, userData }) {
  const [currentUserData, setCurrentUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    user_avatar: "/images/Avatar.jpeg",
    user_banner: "/images/cover.jpeg",
    is_verified: false,
    address: userAddress,
    join_date: "",
    about: "",
    socials: [],
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (userData) {
      // console.log(editedData);
      setCurrentUserData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        email: userData.email,
        user_avatar: userData.user_avatar
          ? userData.user_avatar
          : "/images/profile.png",
        user_banner: userData.user_banner
          ? userData.user_banner
          : "/images/defaultBanner.jpg",
        is_verified: userData.is_verified,
        address: userData.address,
        join_date: userData.join_date,
        about: userData.about,
        socials: userData.socials,
      });
    }
  }, [userData]);
  const updateChatEngineUser = async (username, avatarFile) => {
    const chatEngineApiUrl = `https://api.chatengine.io/users/${userData.chat_account_id}/`;
    // Create form data and append the file
    let formData = new FormData();
    avatarFile?.name && formData.append("avatar", avatarFile, avatarFile.name);

    // Add username if you're updating it as well
    formData.append("username", username);
    var myHeaders = new Headers();
    myHeaders.append(
      "PRIVATE-KEY",
      process.env.NEXT_PUBLIC_CHAT_ENGINE_PRIVATE_KEY
    );

    const requestOptions = {
      method: "PATCH", // Or 'PUT' depending on the API requirements
      headers: myHeaders,
      body: formData,
    };

    try {
      const response = await fetch(chatEngineApiUrl, requestOptions);
      if (response.ok) {
        console.log("ChatEngine user updated successfully");
      } else {
        // If the call was not successful, we can get more information from the response
        const errorResponse = await response.text();
        console.error("Failed to update ChatEngine user:", errorResponse);
        throw new Error("Failed to update ChatEngine user");
      }
    } catch (error) {
      console.error("Error updating ChatEngine user:", error);
    }
  };

  const updateUserImage = async (imageFile, type) => {
    // 'type' can be 'avatar' or 'banner'
    setLoading(true);
    const formData = new FormData();
    formData.append(type, imageFile);
    try {
      const response = await fetch(`/api/users/${userAddress}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const data = await response.json();
      if (type === "avatar" && data.success && userData?.chat_account_id) {
        updateChatEngineUser(currentUserData.username, imageFile);
      }
      // setLoading(false);
      setSnackbar({
        open: true,
        message: `${type} updated successfully`,
        severity: "success",
      });
      return data;
    } catch (error) {
      console.error("Error updating user image:", error);
      // Handle error (e.g., display error message)
    } finally {
      setLoading(false);
    }
  };

  const handleTextDataSubmit = async (formData) => {
    const formDataToSend = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      about: formData.about,
    };
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: "PUT", // Assuming 'PUT' for updating user information
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      // if (!response.ok) throw new Error("Failed to update user text data.");

      if (response.ok) {
        const data = await response.json();
        if (
          formData.username !== currentUserData.username &&
          data.data.chat_account_id
        ) {
          updateChatEngineUser(formData.username, currentUserData.user_avatar);
        }
        console.log("User text data updated successfully");
        // Update the current user data state
        setCurrentUserData((prevData) => ({
          ...prevData,
          ...data.data, // Assuming this is the structure of your response
        }));
        setSnackbar({
          open: true,
          message: `User details updated successfully`,
          severity: "success",
        });
        setLoading(false);
      } else {
        const responseData = await response.json();
        setSnackbar({
          open: true,
          message: `Something went wrong, check fields they must not contain any malicious data. error: ${responseData.error}`,
          severity: "error",
        });
        setLoading(false);
        throw new Error(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user text data:", error);
      // Handle error (e.g., display error message)
    }
  };

  const { address, chainId } = useWeb3Context();
  const [allNftData, setAllNftData] = useState([]);

  const getUserOwnedAccessKey = async (userAddress, chainId) => {
    try {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: availableChains[chainId].chainHex,
        format: "decimal",
        tokenAddresses: [MUNITY_CONFIG[chainId].address],
        mediaItems: false,
        address: userAddress,
      });

      console.log("getUserOwnedAccessKey", response?.raw?.result);

      if (response?.raw?.result.length > 0) {
        // Map each item to a promise that resolves to the object structure you want
        const promises = response.raw.result.map(async (item) => {
          console.log("item:", item);
          const uriData = await getResponseFromUri(item.token_uri);
          console.log("uriData:", uriData);
          return {
            img: uriData?.image,
            title: uriData?.name,
            amount: item.amount,
            url: GET_MARKETPALCE_URL(chainId, item.token_id),
          };
        });

        // Wait for all promises to resolve before setting the state
        const dataWithParsedMetadata = await Promise.all(promises);
        console.log("getUserOwnedAccessKey", dataWithParsedMetadata);
        setAllNftData(dataWithParsedMetadata);
      } else {
        setAllNftData([]);
      }
    } catch (e) {
      console.error(e);
      setAllNftData([]);
    }
  };
  //TODO:uncomment later
  useEffect(() => {
    if (address != "" && chainId != "") {
      getUserOwnedAccessKey(address, chainId);
    }
  }, [address, chainId]);

  console.log("allNftData", allNftData);
  return (
    <SettingsBox>
      <Box className="flex flex-col mob:gap-4 tab:gap-6 lap:gap-8">
        <ChangeImage
          title={"Avatar"}
          btnText={"Update avatar"}
          text={"Must be JPEG, PNG, or GIF and cannot exceed 10MB."}
          imgPLaceholder={currentUserData.user_avatar}
          cardStyles="mob:p-3 tab:p-4 lap:px-3 lap:py-4 desk:p-6"
          containedCSS="mob:w-full mob-sm1:w-auto"
          uploadImageOnChange={updateUserImage}
          type="avatar"
        />
        <ChangeImage
          isCover={true}
          title={"Profile Banner"}
          btnText={"Update cover"}
          text={"File format: JPEG, PNG, GIF (Recommended 1200x480, max 10MB)"}
          imgPLaceholder={currentUserData.user_banner}
          imgBox="h-[129px] !bg-center !bg-cover"
          row={false}
          border={false}
          pl="w-full"
          containedCSS="w-full"
          cardStyles="mob:p-3 tab:p-4 lap:px-3 lap:py-4 desk:p-6"
          uploadImageOnChange={updateUserImage}
          type="banner"
        />
        <LinkAccount
          userData={userData}
          setLoading={setLoading}
          setSnackbar={setSnackbar}
        />
      </Box>
      <Box>
        <CustomForm
          title="Personal Information"
          formConfig={personalInformationFormConfig}
          // apiUrl={apiUrl}
          initialValues={currentUserData}
          onSubmit={handleTextDataSubmit}
          cardStyles="mob:p-3 tab:p-4 lap:px-3 lap:py-4 desk:p-6"
        />
      </Box>
      <Box
        sx={{
          gridColumn: "1/-1",
          marginBottom: { lap: "70px", tab: "56px", mob: "0px" },
        }}
      >
        <Typography
          sx={{
            color: "text.primary",
            fontWeight: "400 !important",
            fontSize: "24px",
            lineHeight: "120%",
            marginBottom: { lap: "32px", tab: "24px", mob: "16px" },
          }}
        >
          Owned Access Keys
        </Typography>
        {allNftData.length > 0 ? (
          <LoadmoreShowLess
            classNames={`grid mob:grid-cols-1 mob-sm:grid-cols-2 tab:grid-cols-3 desk:grid-cols-4 mob:gap-y-3 tab:gap-y-8 gap-x-6
        }`}
            nav={"accessKeys"}
            data={allNftData}
            initialItems={12}
            step={12}
            renderItem={(item) => (
              <CustomCard
                accessKeySingle={item}
                title={item.title}
                cardImg={item.img}
                link={true}
                buttonText={`Open items:${item.amount}`}
                url={item.url}
                titleFontSize="18px"
                buttonVariant="text"
              />
            )}
          />
        ) : (
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
            You have no Access Key purchased yet!
          </Typography>
        )}
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
    </SettingsBox>
  );
}
