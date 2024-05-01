import { useRouter } from "next/router";
import { Box, Typography, Divider, Stack } from "@mui/material";
import Image from "next/image";
import VerifiedIcon from "@mui/icons-material/Verified";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { availableChains, useWeb3Context } from "@/utils";
import { Twitter } from "@mui/icons-material";
import VerifiedSharpIcon from "@mui/icons-material/VerifiedSharp";
import useMediaQuery from "@mui/material/useMediaQuery";
import Usernavigation from "../usernavigation";
import { useSelector } from "react-redux";
import BlueBtn from "@/components/Buttons/BlueBtn";
import { formatDate } from "@/utils/helpers";

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
            fill="#10111B"
          />
        </g>
        <defs>
          <clipPath id="clip0_293_342">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    link: "https://discord.com/invite/",
  },
  {
    label: "twitter",
    icon: <Twitter color="primary" sx={{ width: "100%", height: "100%" }} />,
    link: "https://twitter.com/",
  },
];
const communityData = {
  name: "Iman Gadzhi",
  chain: "Ethereum",
  category: "Finances",
  joinedDate: "OCT 22",
  communityIMG: "/images/CommunityImage.png",
  users: "12k+",
  by: "ImanGadzhi",
  slotsLeft: "2,102",
  isVerified: true,
  about: [
    "Lorem ipsum dolor sit amet consectetur. Hendrerit elit mauris morbi nunc. Felis hendrerit a purus leo erat eget lectus laoreet. In amet dolor duis mauris cursus tincidunt pellentesque lectus. Aliquam velit rhoncus eget dignissim integer. Semper lectus mattis penatibus libero feugiat felis volutpat et id. Leo tellus ut velit vehicula purus vitae turpis dignissim aliquam. Eu ut rhoncus non augue. Vitae metus mattis nulla velit leo sed at condimentum. Sodales ipsum donec sed vulputate erat enim maecenas mi. Viverra pharetra consectetur erat odio lectus commodo sagittis amet sit. Dui metus egestas libero fames congue morbi semper. Accumsan cursus in at massa. ",
    " Sagittis maecenas arcu at vitae et egestas ut. Mauris venenatis fusce sed enim magna bibendum dignissim. Quam in sagittis ipsum sit in elementum. Turpis lorem nisl nec habitasse purus. Vitae sed et lacus sollicitudin magna interdum hendrerit facilisi enim. Feugiat hac odio accumsan libero. Non habitant egestas vulputate phasellus non urna. Mauris sed vulputate dolor commodo dolor dolor. Consectetur pellentesque feugiat urna odio nulla blandit. Morbi orci nunc leo risus. Pellentesque at feugiat pulvinar id ullamcorper sed. Nisl purus placerat est in turpis tortor morbi. Imperdiet nisl enim metus eu. Etiam orci ut a lacus mollis.",
  ],
};
export default function UserProfile({
  communityDataContract,
  userCommunityBalance,
  communityDatabase,
  handleOpenBuyForm,
  areNFTs,
  isCreatorOfThisCommunity,
  creatorData,
  setLoading,
}) {
  const router = useRouter();
  const matches = useMediaQuery("(min-width:1024px)");
  const { theme } = useSelector((state) => state.app);
  const { address, connected } = useWeb3Context();
  if (communityDatabase) {
    console.log("Community data is loaded");
  } else {
    console.log("Community data is not loaded yet");
  }
  const joinedDate = communityDatabase.createdAt
    ? formatDate(communityDatabase.createdAt)
    : formatDate(new Date());
  // const isCreatorOfThisCommunity =
  //   connected &&
  //   communityDataContract &&
  //   address.toLowerCase() === communityDataContract.by.toLowerCase();
  console.log("community data contract:", communityDataContract);
  return (
    <Box
      className={`container mx-auto px-4 mt-[159px] relative overflow-hidden mb-[70px]`}
    >
      {isCreatorOfThisCommunity && (
        <Box className="z-10 m-x-auto flex w-full justify-end mb-3">
          <BlueBtn
            bgColor="primary.main"
            color="primary.reversed"
            classNames="flex items-center gap-3  z-50"
            handleClick={() => {
              router.push({
                pathname: "/settings",
                query: { tab: "community" },
              });
            }}
          >
            <EditOutlinedIcon />
            <Typography
              sx={{
                fontSize: "16.5px",
                color: "primary.reversed",
                marginTop: "3px",
                textTransform: "capitalize",
              }}
              lineHeight={"120%"}
            >
              Community Settings
            </Typography>
          </BlueBtn>
        </Box>
      )}
      <Stack
        className="tab:gap-y-8 mob:gap-y-[16px] tab:p-8 mob:p-4 border border-solid z-10 relative "
        sx={{
          borderColor: "primary.border",
          backgroundColor: "primary.reversed",
        }}
        divider={
          <Divider
            orientation={matches ? "vertical" : "horizontal"}
            flexItem
            light
            sx={{
              background: "none",
              borderColor: "primary.border",
            }}
            className="!mt-0"
          />
        }
        direction={{ mob: "column", lap: "row" }}
        justifyContent="space-between"
        alignItems={{ mob: "center", tab: "start" }}
        flexWrap="wrap"
        spacing={2}
      >
        {/* First Column */}
        <Box className="flex tab:gap-8 mob:gap-4 flex-wrap justify-between mob:self-start">
          <Box
            className="mob:border-2 tab:border-[5px] border-solid mob:w-16 mob:h-16 tab:w-140 tab:h-140"
            sx={{
              borderColor: "text.primary",
            }}
          >
            <Image
              src={communityDataContract.community_avatar}
              alt="avatar"
              className="mob:w-16 mob:h-full tab:w-140 tab:h-full object-cover"
              width={140}
              height={140}
              quality={100}
            />
          </Box>

          <Box>
            <Typography
              className="font-munityfont"
              sx={{
                fontSize: {
                  mob: "24px",
                  tab: "32px",
                  lap: "48px",
                },
                color: "text.primary",
                letterSpacing: "-0.96px",
              }}
              fontWeight={"400 !important"}
              lineHeight={"108.333%"}
            >
              {communityDataContract.name}
              {communityDataContract.isVerified && (
                // {communityDatabase.is_verified && (
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
              sx={{
                fontSize: {
                  mob: "14px",
                  tab: "16.5px",
                },
                color: "primary.main",
              }}
              fontWeight={"300"}
              className="font-munityfont flex items-center gap-1 mt-1"
            >
              By
              <Typography
                className="cursor-pointer break-all"
                fontWeight={"300"}
                color="#1877A9"
                onClick={() => router.push(`/profile/${creatorData._id}`)}
                sx={{ lineHeight: "120%" }}
              >
                {creatorData.username}
              </Typography>
              <VerifiedIcon
                sx={{
                  color: "#1877A9",
                  fontSize: {
                    mob: "14px",
                    tab: "16px",
                  },
                }}
              />
            </Box>
            {/* Socials */}
            <Box className="flex ai-ce tab:gap-6 mob:gap-4 tab:mt-4 mob:mt-2">
              {socials.map(({ label, icon, link }) => (
                <a
                  key={label}
                  className={`flex tab:w-6 tab:h-6 mob:w-5 mob:h-5 ${
                    theme === "dark" ? "darkSvg" : "lightSvg"
                  }`}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {icon}
                </a>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Second Column */}
        <Box
          className="!mt-0 flex justify-between w-full lap:max-w-242 mob:max-w-none"
          sx={{ "& p": { fontWeight: "400 !important" } }}
        >
          <Box className="flex flex-col gap-4" sx={{ color: "text.secondary" }}>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "14px",
                lineHeight: "142.857%",
              }}
            >
              CREATED
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "14px",
                lineHeight: "142.857%",
              }}
            >
              CHAIN
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "14px",
                lineHeight: "142.857%",
              }}
            >
              CATEGORY
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "14px",
                lineHeight: "142.857%",
              }}
            >
              JOINED
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "14px",
                lineHeight: "142.857%",
              }}
            >
              SLOTS LEFT
            </Typography>
          </Box>
          <Box
            className="flex flex-col items-end gap-4"
            sx={{ color: "primary.main" }}
          >
            <Typography
              fontSize="14px"
              sx={{
                lineHeight: "142.857%",
              }}
            >
              {joinedDate}
            </Typography>
            <Typography
              fontSize="14px"
              className="cursor-pointer"
              fontWeight={"300"}
              color="#1877A9"
              // onClick={() => router("/community")}
              sx={{
                lineHeight: "142.857%",
              }}
            >
              {availableChains[communityDataContract.chain]?.chainName}
            </Typography>
            <Typography
              fontSize="14px"
              sx={{
                lineHeight: "142.857%",
              }}
            >
              {communityData?.category}
            </Typography>
            <Typography
              fontSize="14px"
              sx={{
                lineHeight: "142.857%",
              }}
            >
              {communityDataContract?.users}
            </Typography>
            <Typography
              fontSize="14px"
              sx={{
                lineHeight: "142.857%",
              }}
            >
              {communityDataContract?.slotsLeft}
            </Typography>
          </Box>
        </Box>

        {/* Third Column */}
        <Box className="!mt-0 lap:max-w-250 mob:w-full mob:max-w-none">
          <Typography
            fontSize="14px"
            fontWeight={300}
            lineHeight={"20px"}
            sx={{ color: "text.secondary" }}
          >
            {communityDataContract?.about}
          </Typography>
          <Box className="mt-1">
            <Typography
              fontSize="14px"
              className="cursor-pointer underline"
              fontWeight={"300"}
              color="#1877A9"
              onClick={() => router.push("/community")}
            >
              Read more
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Usernavigation
        isCreatorOfThisCommunity={isCreatorOfThisCommunity}
        theme={theme}
        communityDatabase={communityDatabase}
        userCommunityBalance={userCommunityBalance}
        communityDataContract={communityDataContract}
        handleOpenBuyForm={handleOpenBuyForm}
        areNFTs={areNFTs}
        setLoading={setLoading}
      />
    </Box>
  );
}
