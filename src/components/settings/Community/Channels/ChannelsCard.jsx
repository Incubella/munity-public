import { useState, useEffect } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import BtnChange from "../../BtnChange";
import Card from "../../../Card";
import Channel from "./Channel";
import UpgradeCard from "../../../Pro/UpgradeCard";
import ChannelForm from "./ChannelForm"; // Create a ChannelForm component for the form
import AddIcon from "@mui/icons-material/Add";
export const addChannelToCommunity = async (
  communityId,
  channelName,
  chatId
) => {
  console.log("id:", communityId, "channel:", channelName, "chat_id", chatId);
  const response = await fetch(`/api/communities/${communityId}/channels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: channelName, chat_id: chatId }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.data;
  } else {
    // Handle error case
    console.error("Failed to add channel");
    return null;
  }
};
export default function ChannelsCard({
  userData,
  userAddress,
  creatorCommunity,
  setLoading,
}) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  // console.log(creatorCommunity);
  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [channels, setChannels] = useState(creatorCommunity?.channels || []); // Assuming channels is your array of channels
  const isProUser = false;
  const channelLimit = isProUser ? 5 : 1;
  useEffect(() => {
    if (creatorCommunity) {
      setChannels(creatorCommunity?.channels);
    }
  }, [creatorCommunity]);
  const createCommunityChat = async (chatName, sourceChatId) => {
    const chatEngineEndpoint = "https://api.chatengine.io/chats/";
    // Fetch members from the source chat
    const sourceChatMembers = await fetchChatMembers(sourceChatId);
    // console.log("sourceChatMemberssaassssssssssssdas:", sourceChatMembers);
    const headers = new Headers({
      "Project-ID": process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID,
      "User-Name": userData.username,
      "User-Secret": userAddress, // This should match the secret used in user creation
      "Content-Type": "application/json",
    });

    const body = JSON.stringify({
      usernames: sourceChatMembers, // Admin username
      title: chatName,
      is_direct_chat: false,
    });

    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: body,
      redirect: "follow",
    };

    try {
      const response = await fetch(chatEngineEndpoint, requestOptions);
      if (response.ok) {
        const data = await response.json();
        console.log("Chat creation successful", data);
        return data; // Return the newly created chat data
      } else {
        console.error("Failed to create chat");
        return null;
      }
    } catch (error) {
      console.error("Error in creating chat with ChatEngine:", error);
      return null;
    }
  };
  // Example function to fetch chat members from an existing chat
  const fetchChatMembers = async (chatId) => {
    const chatEngineMembersEndpoint = `https://api.chatengine.io/chats/${chatId}/people/`;

    const headers = new Headers({
      "Project-ID": process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID,
      "User-Name": userData.username,
      "User-Secret": userAddress,
    });

    try {
      const response = await fetch(chatEngineMembersEndpoint, {
        method: "GET",
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("members dataaaaaaa:", data);
        // Extract usernames or user IDs from the response data
        const members = data.map((member) => member.person.username); // Adjust this line based on the actual structure of the response
        return members;
      } else {
        console.error("Failed to fetch chat members");
        return [];
      }
    } catch (error) {
      console.error("Error fetching chat members:", error);
      return [];
    }
  };
  // Function to delete a channel from a community
  const deleteChannelFromCommunity = async (channelId) => {
    const response = await fetch(
      `/api/communities/${creatorCommunity?._id}/channels/${channelId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("Channel deleted successfully");
      return true;
    } else {
      // Handle error case
      console.error("Failed to delete channel");
      return false;
    }
  };

  const handleSaveChannel = async () => {
    // console.log("channelsssssssss:", channels);
    if (channels.length > channelLimit) {
      setSnackbar({
        open: true,
        message: `You have reached the channel limit${
          isProUser ? "" : " for free users"
        }.`,
        severity: "error",
      });
      return;
    }
    setLoading(true);
    const newChat = await createCommunityChat(
      newChannelName,
      channels[0].chat_id
    );
    const newChannel = await addChannelToCommunity(
      creatorCommunity._id,
      newChannelName,
      newChat.id
    );
    console.log("newChannel:", newChannel);
    if (newChannel) {
      setChannels((prevChannels) => [...prevChannels, newChannel]);
      setIsAddingChannel(false);
      setNewChannelName("");
      setLoading(false);
      setSnackbar({
        open: true,
        message: `Channel created successfully!`,
        severity: "success",
      });
    }
  };
  // Function to delete a chat in ChatEngine
  const deleteChatInChatEngine = async (chatId) => {
    const chatEngineEndpoint = `https://api.chatengine.io/chats/${chatId}/`;

    const headers = new Headers({
      "Project-ID": process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID, // Your Project ID
      "User-Name": userData.username,
      "User-Secret": userAddress, // This should match the secret used in user creation
    });

    const requestOptions = {
      method: "DELETE",
      headers: headers,
      redirect: "follow",
    };

    try {
      const response = await fetch(chatEngineEndpoint, requestOptions);
      if (response.ok) {
        console.log("Chat deletion successful");
        return true;
      } else {
        console.error("Failed to delete chat in ChatEngine");
        return false;
      }
    } catch (error) {
      console.error("Error in deleting chat with ChatEngine:", error);
      return false;
    }
  };

  const handleDeleteChannel = async (channelId, chatId) => {
    setLoading(true);
    // First, try to delete the chat in ChatEngine
    const chatDeletedSuccessfully = await deleteChatInChatEngine(chatId);
    if (chatDeletedSuccessfully) {
      // Proceed to delete the channel from your community if chat deletion was successful
      const success = await deleteChannelFromCommunity(channelId);

      if (success) {
        // If the API call was successful, remove the channel from local state
        setChannels((prevChannels) =>
          prevChannels.filter((channel) => channel._id !== channelId)
        );
        setLoading(false);
        setSnackbar({
          open: true,
          message: `Channel and associated chat deleted successfully!`,
          severity: "success",
        });
      }
    } else {
      // Handle the case where chat deletion was unsuccessful
      setLoading(false);
      setSnackbar({
        open: true,
        message: `Failed to delete the associated chat in ChatEngine. Please try again.`,
        severity: "error",
      });
    }
  };

  const handleAddChannelClick = () => {
    setIsAddingChannel(true);
  };

  const handleCancelForm = () => {
    // Reset state
    setIsAddingChannel(false);
  };

  return (
    <Card title={"Channels"}>
      <Box className="flex flex-col gap-6 ">
        {channels &&
          channels.map((channel, index) => (
            <Channel
              key={index}
              label={channel.title}
              isActive={channel.title !== "General"}
              handleDeleteChannel={() =>
                handleDeleteChannel(channel._id, channel.chat_id)
              }
            />
          ))}
      </Box>
      <ChannelForm
        value={newChannelName}
        onChange={(e) => setNewChannelName(e.target.value)}
        onSave={handleSaveChannel}
        isAddingChannel={isAddingChannel}
        onCancel={handleCancelForm}
      />
      {!isAddingChannel && (
        <Box className="w-full text-center mob:mb-6 tab:mb-8 mob:mt-6 tab:mt-8">
          <BtnChange icon={<AddIcon />} onClick={handleAddChannelClick}>
            Add a Channel
          </BtnChange>
        </Box>
      )}
      <UpgradeCard />
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
    </Card>
  );
}
