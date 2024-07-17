/* eslint-disable import/no-anonymous-default-export */
import { Fragment, useState } from "react";
import { addressEllipsis } from "@/utils";
import { Box, Typography, Link } from "@mui/material";
import Card from "../Card";
import SingleDetail from "./SingleDetail";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
// import useMediaQuery from "@mui/material/useMediaQuery";
import FormHeading from "../settings/Community/NFTCreation/FormHeading";
import SingleCommunity from "../Card/SingleCommunity";
import { useSelector } from "react-redux";
import VerifiedSharpIcon from "@mui/icons-material/VerifiedSharp";
import { formatDate } from "@/utils/helpers";

export default function Profile({ userData, userCommunities }) {
  // const matches = useMediaQuery("(min-width:1024px)");
  const { theme } = useSelector((state) => state.app);
  const joinedDate = userData.join_date
    ? formatDate(userData.join_date)
    : formatDate(new Date());
  const svgFillColor = theme === "light" ? "#10111B" : "white";
  const socials = [
    {
      label: "discord",
      icon: (
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_293_342)">
            <path
              d="M20.317 4.15557C18.7873 3.45369 17.147 2.93658 15.4319 2.6404C15.4007 2.63469 15.3695 2.64897 15.3534 2.67754C15.1424 3.05276 14.9087 3.54226 14.7451 3.927C12.9004 3.65083 11.0652 3.65083 9.25832 3.927C9.09465 3.5337 8.85248 3.05276 8.64057 2.67754C8.62448 2.64992 8.59328 2.63564 8.56205 2.6404C6.84791 2.93563 5.20756 3.45275 3.67693 4.15557C3.66368 4.16129 3.65233 4.17082 3.64479 4.18319C0.533392 8.83155 -0.31895 13.3657 0.0991801 17.8436C0.101072 17.8655 0.11337 17.8864 0.130398 17.8997C2.18321 19.4073 4.17171 20.3225 6.12328 20.9291C6.15451 20.9386 6.18761 20.9272 6.20748 20.9015C6.66913 20.2711 7.08064 19.6063 7.43348 18.9073C7.4543 18.8664 7.43442 18.8178 7.39186 18.8016C6.73913 18.554 6.1176 18.2521 5.51973 17.9093C5.47244 17.8816 5.46865 17.814 5.51216 17.7816C5.63797 17.6873 5.76382 17.5893 5.88396 17.4902C5.90569 17.4721 5.93598 17.4683 5.96153 17.4797C9.88928 19.273 14.1415 19.273 18.023 17.4797C18.0485 17.4674 18.0788 17.4712 18.1015 17.4893C18.2216 17.5883 18.3475 17.6873 18.4742 17.7816C18.5177 17.814 18.5149 17.8816 18.4676 17.9093C17.8697 18.2588 17.2482 18.554 16.5945 18.8006C16.552 18.8168 16.533 18.8664 16.5538 18.9073C16.9143 19.6054 17.3258 20.2701 17.7789 20.9005C17.7978 20.9272 17.8319 20.9386 17.8631 20.9291C19.8241 20.3225 21.8126 19.4073 23.8654 17.8997C23.8834 17.8864 23.8948 17.8664 23.8967 17.8445C24.3971 12.6676 23.0585 8.17064 20.3482 4.18414C20.3416 4.17082 20.3303 4.16129 20.317 4.15557ZM8.02002 15.117C6.8375 15.117 5.86313 14.0313 5.86313 12.6981C5.86313 11.3648 6.8186 10.2791 8.02002 10.2791C9.23087 10.2791 10.1958 11.3743 10.1769 12.6981C10.1769 14.0313 9.22141 15.117 8.02002 15.117ZM15.9947 15.117C14.8123 15.117 13.8379 14.0313 13.8379 12.6981C13.8379 11.3648 14.7933 10.2791 15.9947 10.2791C17.2056 10.2791 18.1705 11.3743 18.1516 12.6981C18.1516 14.0313 17.2056 15.117 15.9947 15.117Z"
              fill={svgFillColor}
            />
          </g>
          <defs>
            <clipPath id="clip0_293_342">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      link: userData.socials?.discord,
    },
    {
      label: "instagram",
      icon: (
        <InstagramIcon color="primary" sx={{ width: "20px", height: "20px" }} />
      ),
      link: userData.socials?.instagram,
    },

    {
      label: "youtube",
      icon: (
        <YouTubeIcon color="primary" sx={{ width: "20px", height: "20px" }} />
      ),
      link: userData.socials?.youtube,
    },
  ];

  return (
    <Box
      className={`mob:mx-4 tab:mx-6 mob:mx-4 tab:mx-6 lap:mx-8 desk:mx-[52px] z-10 mt-260 relative mb-[120px]`}
    >
      <Box className="flex items-center justify-center mob:gap-6 tab:gap-8 max-w-[1115px] ml-auto flex-wrap">
        <Box className="flex flex-col items-center justify-self-center mob:gap-4 tab:gap-6">
          <Box
            className="border-[5px] border-solid"
            sx={{
              width: "140px",
              height: "140px",
              borderColor: "text.primary",
            }}
          >
            <img
              src={userData.user_avatar || "/images/profile.png"}
              alt={userData.username}
              className="object-cover h-full"
            />
          </Box>
          <Typography
            variant="h3"
            sx={{
              color: "text.primary",
              "& svg": {
                width: { mob: "24px", tab: "36px" },
                height: { mob: "24px", tab: "36px" },
              },
            }}
          >
            {userData.first_name
              ? userData.first_name + " " + (userData.last_name || "")
              : userData.username}
            {userData.is_verified && (
              <VerifiedSharpIcon
                sx={{
                  fontSize: { mob: 24, tab: 36 },
                  color: "text.primary",
                  marginLeft: "8px",
                }}
              />
            )}
          </Typography>
          <Box
            className="flex mob:items-start mob-sm2:items-center mob:flex-col mob-sm2:flex-row mob:gap-4 tab:gap-8 mt-[8px]"
            sx={{ fontWeight: "400 !important" }}
          >
            <SingleDetail name={"address"}>
              <Typography
                sx={{
                  fontSize: "16.5px",
                  lineHeight: "120%",
                  color: "text.primary",
                  fontWeight: "400 !important",
                }}
                className="flex items-center gap-[4px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1483_1250)">
                    <path
                      d="M9.99844 0L9.86426 0.455773V13.6801L9.99844 13.8139L16.1369 10.1855L9.99844 0Z"
                      fill={svgFillColor}
                    />
                    <path
                      d="M9.99799 0L3.85938 10.1855L9.99799 13.8139V7.39524V0Z"
                      fill={svgFillColor}
                    />
                    <path
                      d="M9.9975 14.9762L9.92188 15.0684V19.7791L9.9975 19.9998L16.1397 11.3495L9.9975 14.9762Z"
                      fill={svgFillColor}
                    />
                    <path
                      d="M9.99799 19.9998V14.9762L3.85938 11.3495L9.99799 19.9998Z"
                      fill={svgFillColor}
                    />
                    <path
                      d="M9.99805 13.8139L16.1365 10.1855L9.99805 7.39523V13.8139Z"
                      fill={svgFillColor}
                    />
                    <path
                      d="M3.85938 10.1855L9.99799 13.8139V7.39523L3.85938 10.1855Z"
                      fill={svgFillColor}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1483_1250">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {addressEllipsis(userData.address)}
              </Typography>
            </SingleDetail>
            <SingleDetail name={"joined on"}>
              <Typography
                sx={{
                  fontSize: "16.5px",
                  lineHeight: "120%",
                  color: "text.primary",
                  fontWeight: "400 !important",
                }}
              >
                {joinedDate}
              </Typography>
            </SingleDetail>
          </Box>
        </Box>
        <Box className="flex items-center justify-center gap-4 flex-wrap mb-8 lap:ml-auto">
          {socials.map(
            ({ label, icon, link }) =>
              link !== "" && (
                <Card
                  classNames="py-3 mob:px-0 mob:w-full tab:w-auto tab:px-6 cursor-pointer"
                  addSX={{
                    "&:hover": { backgroundColor: "primary.border" },
                    transition: "all 200ms",
                  }}
                  key={label}
                >
                  <Link
                    href={link}
                    underline="none"
                    sx={{
                      width: "100%", // This makes each link take the full width of the Card
                      textAlign: "center", // This centers the text inside the Link
                      color: "text.primary",
                      "& svg": { width: "20px", height: "20px" },
                    }}
                    className="flex items-center justify-center gap-[8px]"
                  >
                    {icon}
                    <Typography
                      sx={{
                        fontSize: "16.5px",
                        lineHeight: "120%",
                        fontWeight: "400 !important",
                        color: "text.primary",
                        textTransform: "capitalize",
                      }}
                    >
                      {label}
                    </Typography>
                  </Link>
                </Card>
              )
          )}
        </Box>
      </Box>
      <Box className="grid mob:grid-cols-1 lap:grid-cols-2 gap-8 mt-[52px]">
        <Box>
          <FormHeading
            text={"ABOUT ME"}
            number={"01."}
            classNames="border-t mob:pt-4 tab:pt-6"
            titleSX={{
              fontSize: { mob: "20px", tab: "24px" },
              letterSpacing: "-0.48px",
            }}
          />
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "18px",
              lineHeight: "133.333%",
              marginTop: "32px",
            }}
          >
            {/* {userData.about.map((paragraph, index) => (
              <Fragment key={index}>
                {paragraph}
                <br />
                <br />
              </Fragment>
            ))} */}
            {userData.about}
          </Typography>
        </Box>
        <Box>
          <FormHeading
            text={"MY COMMUNITIES"}
            number={"02."}
            classNames="border-t mob:pt-4 tab:pt-6"
            titleSX={{
              fontSize: { mob: "20px", tab: "24px" },
              letterSpacing: "-0.48px",
            }}
          />

          {userCommunities ? (
            <Box className="grid mob:grid-cols-1 biggerTab:grid-cols-2 lap:grid-cols-1 bigDesk:grid-cols-2 gap-8 mt-8 h-full">
              {userCommunities.map(
                ({ communityData, supply, communityId }, index) => (
                  <div key={index}>
                    <SingleCommunity
                      title={communityData.name}
                      communityIMG={communityData.avatarImage}
                      users={0}
                      verified={false}
                      slotsLeft={supply}
                      itemType={"community"}
                      itemId={communityId}
                    />
                  </div>
                )
              )}
            </Box>
          ) : (
            <Box className="w-full">
              <Typography
                variant="h3"
                sx={{
                  color: "primary.main",
                  fontSize: {
                    mob: "20px",
                    tab: "24px",
                    lap: "28px",
                    desk: "32px",
                  },
                }}
                className="lap:!mb-[52px] mob:!mb-6 lap:!mt-[107px] tab:!mt-[64px] mob:!mt-[52px] text-center"
              >
                User does not have any Community yet!
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
