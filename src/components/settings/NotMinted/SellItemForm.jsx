import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Box, Typography, InputAdornment } from "@mui/material";
import CustomInput from "../CustomInput";
import SingleFee from "./SingleFee";
import BlueBtn from "../../Buttons/BlueBtn";
import { useWeb3Context } from "@/utils";
// import { uploadAvatarToChatEngine } from "@/utils/helpers";
import { ethers } from "ethers";

const ethToUsdRate = 3000; // Example static conversion rate. Replace with a dynamic fetch in production.
export const updateBackendWithChatAccountId = async (userId, chatAccountId) => {
  try {
    const API_URL = `/api/users/chat/${userId}`;
    const response = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Include any other headers your API requires, such as an authorization token
      },
      body: JSON.stringify({ chat_account_id: chatAccountId }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user with chat account ID");
    }

    // const data = await response.json();
    console.log("Successfully updated user with chat account ID");
    return true; // Indicate success
  } catch (error) {
    console.error("Error updating user with chat account ID:", error);
    return false; // Indicate failure
  }
};
export const checkIfUserHaveChatAccount = async (address) => {
  try {
    const API_URL = `/api/users?address=${address}`; // Adjust based on your API endpoint
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("User not found");
    const data = await response.json();
    console.log("sellitemForm file user was found:", data.data);

    return data.data; // Assuming the response includes user data under a 'user' key
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
const SellItemForm = ({
  onSubmit,
  theme,
  type,
  tokenId,
  setLoading,
  backendcommunityData,
  creatorData,
}) => {
  const { getCommunityNftPayAmount, buyCommunityNft, address } =
    useWeb3Context();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0.003);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [ethInUsd, setEthInUsd] = useState(0);
  const svgFillColor = theme === "light" ? "#10111B" : "white";
  const [buyDataLoading, setBuyDataLoading] = useState(false);
  const [buyData, setBuyData] = useState(null);
  const router = useRouter();
  // Fees
  const munityFeePercentage = 2.5;
  const creatorRoyaltyPercentage = 2.0;
  const [creds, setCreds] = useState(null);

  useEffect(() => {
    setCreds({
      projectID: process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID,
      userName: creatorData.username,
      userSecret: creatorData.address,
    });
  }, [creatorData]);

  useEffect(() => {
    // Update the ETH to USD conversion whenever the price in ETH changes or the quantity changes
    setEthInUsd((price * ethToUsdRate * quantity).toFixed(2));
  }, [price, quantity]);

  const svgIconETH = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5.7501 7.58331L9.72507 5.81664C9.90007 5.74164 10.1001 5.74164 10.2668 5.81664L14.2418 7.58331C14.5918 7.74164 14.9167 7.31664 14.6751 7.01664L10.5084 1.92498C10.2251 1.57498 9.75841 1.57498 9.47508 1.92498L5.30841 7.01664C5.07508 7.31664 5.4001 7.74164 5.7501 7.58331Z"
        fill={svgFillColor}
      />
      <path
        d="M5.74981 12.4167L9.73312 14.1833C9.90812 14.2583 10.1081 14.2583 10.2748 14.1833L14.2581 12.4167C14.6081 12.2583 14.9331 12.6833 14.6915 12.9833L10.5248 18.075C10.2415 18.425 9.7748 18.425 9.49147 18.075L5.3248 12.9833C5.0748 12.6833 5.39148 12.2583 5.74981 12.4167Z"
        fill={svgFillColor}
      />
      <path
        d="M9.81648 7.90831L6.3748 9.62498C6.06647 9.77498 6.06647 10.2166 6.3748 10.3666L9.81648 12.0833C9.93314 12.1416 10.0748 12.1416 10.1914 12.0833L13.6331 10.3666C13.9414 10.2166 13.9414 9.77498 13.6331 9.62498L10.1914 7.90831C10.0664 7.84998 9.93314 7.84998 9.81648 7.90831Z"
        fill={svgFillColor}
      />
    </svg>
  );

  const getBuyData = async (tokenId, quantity) => {
    setBuyDataLoading(true);

    const data = await getCommunityNftPayAmount(tokenId, quantity);
    setBuyData(data);

    setBuyDataLoading(false);
  };

  useEffect(() => {
    // Calculate total earnings or cost based on whether user is selling or buying
    const munityFee = (price * munityFeePercentage) / 100;
    const creatorRoyalty = (price * creatorRoyaltyPercentage) / 100;
    let total;
    if (type === "sell") {
      total = (price - munityFee - creatorRoyalty) * quantity;
      setTotalEarnings(total.toFixed(2));
      setEthInUsd((total * ethToUsdRate).toFixed(2));
    } else if (type === "buy" && tokenId) {
      getBuyData(tokenId, quantity);
    } else {
      total = (price + munityFee + creatorRoyalty) * quantity;
      setTotalEarnings(total.toFixed(2));
      setEthInUsd((total * ethToUsdRate).toFixed(2));
    }
  }, [quantity, price, type]);

  async function addUserToCommunityChats(username) {
    const { channels } = backendcommunityData; // Assuming this is the structure
    for (const channel of channels) {
      console.log("CHannellessssssssdf:", channel);
      try {
        const response = await fetch(
          `https://api.chatengine.io/chats/${channel.chat_id}/people/`,
          {
            method: "POST",
            headers: {
              "Project-ID": creds.projectID,
              "User-Name": creds.userName,
              "User-Secret": creds.userSecret,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username, // The username of the user to be added to the chat
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to add user to chat ${channel.chat_id}`);
        }

        const result = await response.json();
        console.log(
          `User ${username} added to chat ${channel.chat_id}`,
          result
        );
      } catch (error) {
        console.error("Error adding user to chat:", error);
      }
    }
  }

  const createChatEngineUser = async (userData) => {
    const usersEndpoint = "https://api.chatengine.io/users/";
    const headers = {
      "PRIVATE-KEY": process.env.NEXT_PUBLIC_CHAT_ENGINE_PRIVATE_KEY,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData),
      redirect: "follow",
    };

    try {
      const response = await fetch(usersEndpoint, requestOptions);
      const result = await response.json();
      console.log("uset was created in the chat:", result);
      return result; // Returning the result which includes user information
    } catch (error) {
      console.error("Error creating user in ChatEngine:", error);
      return null;
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (type === "sell") {
    } else if (type === "buy" && tokenId && buyData && Number(quantity) > 0) {
      const response = await buyCommunityNft(
        tokenId,
        quantity,
        ethers.parseEther(buyData?.payAmount?.toFixed(10)?.toString())
      );

      if (response) {
        let currentUser = await checkIfUserHaveChatAccount(address);

        if (!currentUser?.chat_account_id) {
          // Assuming createChatEngineUser returns the new chat user ID
          const newUser = await createChatEngineUser({
            username: currentUser.username, // This would be dynamically determined
            first_name: currentUser?.first_name || currentUser.username, // Adjust based on your requirements
            last_name: currentUser?.last_name || "Member",
            secret: address, // Consider a secure way to handle secrets
            // custom_json: { role: "admin" },
          });
          // const newUser = uploadAvatarToChatEngine(
          //   currentUser?.user_avatar ||
          //     "https://munitydatabucket.s3.amazonaws.com/profile.png",
          //   {
          //     username: currentUser.username, // This would be dynamically determined
          //     first_name: currentUser?.first_name || currentUser.username, // Adjust based on your requirements
          //     last_name: currentUser?.last_name || "Member",
          //     secret: address, // Consider a secure way to handle secrets
          //     // custom_json: { role: "admin" },
          //   }
          // );
          if (newUser && newUser.id) {
            await updateBackendWithChatAccountId(currentUser._id, newUser.id);
          }
        }
        await addUserToCommunityChats(currentUser.username);
        router.reload();
      }
    } else {
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("buyData", buyData);
  }, [buyData]);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "24px",
        height: { mob: "100%", tab: "auto" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {type == "sell" && (
        <CustomInput
          label={"Quantity"}
          type="number"
          min="0"
          value={quantity}
          inputName="sellingQuantity"
          handleChange={handleQuantityChange}
          available={100}
        />
      )}
      {type == "buy" && (
        <CustomInput
          label={"Quantity"}
          type="number"
          min="0"
          value={quantity}
          inputName="sellingQuantity"
          handleChange={handleQuantityChange}
          available={buyData ? buyData.supplyLeft : 0}
        />
      )}

      {type === "sell" && (
        <CustomInput
          label={"Price per item"}
          placeholder="Amount"
          type="text"
          value={price}
          inputName="sellingPrice"
          handleChange={handlePriceChange}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start" className="!ml-4">
                {svgIconETH}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                className="!mr-[4px]"
                sx={{ color: "text.primary" }}
              >
                ${ethInUsd}
              </InputAdornment>
            ),
          }}
          inputBoxSX={{ "& input": { paddingLeft: "2px !important" } }}
        />
      )}

      {/* Fees and Total Earnings display */}

      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: "normal",
            color: "text.primary",
            fontWeight: "400 !important",
          }}
          className="uppercase !mb-4"
        >
          Fees
        </Typography>
        {type === "buy" && buyData && (
          <>
            <SingleFee
              feeName={"Price per NFT supply"}
              fee={buyData?.pricePerSupply}
              priceSymbol="ETH"
            />
            {buyData?.isWhiteListed && (
              <SingleFee
                feeName={"Discount per NFT supply"}
                fee={buyData?.discountPerSupply}
                priceSymbol="ETH"
              />
            )}
            <SingleFee
              feeName={"Total Cost"}
              fee={buyData?.payAmount?.toFixed(10)}
              priceSymbol="ETH"
            />
          </>
        )}

        {type === "sell" && !buyDataLoading && (
          <>
            <SingleFee
              feeName={"Munity Fee"}
              fee={munityFeePercentage.toFixed(2) + "%"}
            />
            <SingleFee
              feeName={"Creator Royalty"}
              fee={creatorRoyaltyPercentage.toFixed(2) + "%"}
            />
            <SingleFee
              feeName={
                type === "sell" ? "Total Earnings (ETH)" : "Total Cost (ETH)"
              }
              fee={totalEarnings}
              icon={svgIconETH}
              cost={ethInUsd}
              haveBorder={false}
            />
          </>
        )}
      </Box>

      <BlueBtn
        // type="submit"
        handleClick={handleSubmit}
        color="#10111B"
        bgColor="#34A4E0"
        classNames="!ml-auto mob:!mt-auto tab:!mt-8"
      >
        {type === "sell" ? "Complete Listing" : "Buy NFT"}
      </BlueBtn>
    </Box>
  );
};

export default SellItemForm;
