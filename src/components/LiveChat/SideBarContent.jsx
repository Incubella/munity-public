import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import dynamic from "next/dynamic";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getMessages } from "react-chat-engine";
const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);
const ChatCard = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatCard)
);
const getChatMessageCount = (chatId, creds) => {
  return new Promise((resolve, reject) => {
    getMessages(creds, chatId, (chatId, messages) => {
      if (messages) {
        resolve(messages.length);
      } else {
        reject(new Error("Failed to load messages"));
      }
    });
  });
};

const CustomChatCard = ({ chat, onChatSelect, creds }) => {
  // Render the chat list once chats are loaded
  const [messagesCount, setMessagesCount] = useState("Loading...");

  useEffect(() => {
    if (chat.title) {
      getChatMessageCount(chat.id, creds)
        .then((count) => {
          setMessagesCount(count);
          console.log(`The chat has ${count} messages.`);
        })
        .catch((error) => {
          console.error("Error fetching message count:", error);
          setMessagesCount("Error");
        });
    }
  }, [chat]);
  return (
    <div
      className="flex items-center justify-between ce-chat-title-text-root mb-8 mt-[40px]"
      onClick={() => onChatSelect(chat.id)}
    >
      <div key={chat.id} className="ce-chat-title-text ">
        <span>
          {chat.title && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
            >
              <path
                d="M12.0837 3.625L9.66699 25.375"
                stroke="#F4F4F2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.3337 3.625L16.917 25.375"
                stroke="#F4F4F2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.22949 10.875H25.9795"
                stroke="#F4F4F2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.02051 18.125H24.7705"
                stroke="#F4F4F2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <ChatCard chat={chat} />
      </div>
      <Typography
        className="py-[6px] px-[12px] messagesCounter"
        sx={{
          color: "#10111B",
          fontSize: "14px",
        }}
      >
        {messagesCount > 99 ? "99+" : messagesCount}
      </Typography>
    </div>
  );
};
const CustomChatHeader = ({ chat, handleBackButtonClick }) => {
  return (
    <div className="flex items-center mob:gap-6 tab:gap-[40px] justify-between  mb-8 mt-[40px] mob:pl-3 tab:pl-0">
      <span onClick={handleBackButtonClick} className="cursor-pointer">
        <svg
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.7295 22.9582L10.2712 14.4998L18.7295 6.0415"
            stroke="#F4F4F2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div key={chat?.id} className="ce-chat-title-text active capitalize">
        <Typography
          fontSize={"24px"}
          lineHeight={"28.5px"}
          color={"#fff"}
          letterSpacing={"-2%"}
          className="cursor-pointer"
        >
          {chat?.title || ""}
        </Typography>
      </div>
    </div>
  );
};
export default function SideBarContent({ userData, address }) {
  const { showFullscreen } = useSelector((state) => state.app);
  const [expanded, setExpanded] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const creds = {
    projectID: process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID,
    userName: userData.username,
    userSecret: address,
  };
  const handleChatCardClick = (chatId) => {
    setActiveChat(chatId);
  };
  const handleBackButtonClick = () => {
    setActiveChat(null);
  };
  const handleAccordionChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    // <>
    //   {/* <Accordion
    //     expanded={expanded}
    //     onChange={handleAccordionChange}
    //     className="border-none !p-0 !border-0 !shadow-none"
    //     sx={{
    //       backgroundColor: "#10111B",
    //     }}
    //   >
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon sx={{ color: "primary.reversed" }} />}
    //       aria-controls="panel-content"
    //       id="panel-header"
    //       sx={{
    //         padding: "0",
    //         paddingLeft: { mob: "16px", tab: "0" },
    //         ".MuiAccordionSummary-content": {
    //           order: 2,
    //           margin: "0 !important",
    //         },
    //         ".MuiAccordionSummary-expandIconWrapper": {
    //           marginRight: "12px",
    //           order: 1,
    //         },
    //       }}
    //     >
    //       <Typography
    //         sx={{
    //           color: "#fff",
    //           fontSize: "18px",
    //           fontWeight: "400 !important",
    //           lineHeight: "normal",
    //         }}
    //       >
    //         {title}
    //       </Typography>
    //     </AccordionSummary>
    //     <AccordionDetails sx={{ padding: "0" }}>
    //       {chats.map((channel, index) => (
    //         <Box
    //           className="flex items-center justify-between gap-4 mob:py-6 tab:py-8 border-b border-solid mob:px-4 tab:px-0"
    //           key={index}
    //           sx={{ borderColor: "rgba(255, 255, 255, 0.10)" }}
    //         >
    //           <Box className="flex items-center">
    //             <Box className="mob:mr-3 tab:mr-8 lap:mr-10">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="29"
    //                 height="29"
    //                 viewBox="0 0 29 29"
    //                 fill="none"
    //               >
    //                 <path
    //                   d="M12.0837 3.625L9.66699 25.375"
    //                   stroke="#F4F4F2"
    //                   strokeWidth="1.5"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                 />
    //                 <path
    //                   d="M19.3337 3.625L16.917 25.375"
    //                   stroke="#F4F4F2"
    //                   strokeWidth="1.5"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                 />
    //                 <path
    //                   d="M4.22949 10.875H25.9795"
    //                   stroke="#F4F4F2"
    //                   strokeWidth="1.5"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                 />
    //                 <path
    //                   d="M3.02051 18.125H24.7705"
    //                   stroke="#F4F4F2"
    //                   strokeWidth="1.5"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                 />
    //               </svg>
    //             </Box>
    //             <Typography
    //               sx={{
    //                 color: "#fff",
    //                 fontSize: { mob: "22px", tab: "24px" },
    //                 // fontWeight: "400 !important",
    //                 lineHeight: "120%",
    //                 letterSpacing: "-0.48px",
    //               }}
    //             >
    //               {channel.title}
    //             </Typography>
    //           </Box>
    //           <Typography
    //             className="py-[6px] px-[12px]"
    //             sx={{
    //               backgroundColor: "#34A4E0",
    //               color: "#10111B",
    //               fontSize: "14px",
    //             }}
    //           >
    //             {channel.badge > 99 ? "99+" : channel.badge}
    //           </Typography>
    //         </Box>
    //       ))}
    //       <Typography></Typography>
    //     </AccordionDetails>
    //   </Accordion> */}
    //   <ChatEngine
    //     height="100vh"
    //     {...creds}
    //     renderChatCard={(chat, index) => <CustomChatCard chat={chat} />}
    //   />
    // </>
    <>
      {!showFullscreen ? (
        activeChat ? (
          // Render ChatFeed if a chat is active
          <Box className="activeChat tab:pl-6 tab:pr-[20px] sticky top-0">
            <ChatEngine
              height="100vh"
              {...creds}
              activeChat={activeChat}
              renderChatHeader={(chat) => (
                <CustomChatHeader
                  chat={chat}
                  handleBackButtonClick={handleBackButtonClick}
                />
              )}
            />
          </Box>
        ) : (
          // Render chat list if no active chat
          <Box className="mob:px-0 tab:px-8 lap:px-10 sticky top-0">
            <ChatEngine
              height="100vh"
              {...creds}
              renderChatCard={(chat, index) => (
                <CustomChatCard
                  key={chat.id}
                  chat={chat}
                  onChatSelect={handleChatCardClick}
                  creds={creds}
                />
              )}
            />
          </Box>
        )
      ) : (
        <Box className="mob:px-0 tab:px-[8px] fullscreenChat ">
          <Box className=" tab:pl-6 tab:pr-[20px]">
            <ChatEngine
              height="100vh"
              {...creds}
              activeChat={activeChat}
              renderChatCard={(chat) => {
                if (chat && chat.people)
                  return (
                    <CustomChatCard
                      key={chat}
                      chat={chat}
                      onChatSelect={handleChatCardClick}
                      creds={creds}
                    />
                  );
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
