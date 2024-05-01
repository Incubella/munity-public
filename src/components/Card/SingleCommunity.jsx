import { Typography, Box, Link } from "@mui/material";
import { useRouter } from "next/router";

import Image from "next/image";
import SingleDet from "./SingleDet";
import VerifiedSharpIcon from "@mui/icons-material/VerifiedSharp";

export default function SingleCommunity({
  title,
  communityIMG,
  users = "",
  slotsLeft,
  verified,
  itemType,
  imgBoxStyles = "biggerTab:h-[320px] lap:h-auto",
  imgStyles = "biggerTab:h-full lap:h-auto",
  linkStyles = "",
  addSX = {},
  itemId,
}) {
  const router = useRouter();

  return (
    <Link
      // href={url}
      onClick={() => router.push(`/${itemType}/${itemId}`)}
      className={
        "w-full !no-underline cursor-pointer inline-block " + linkStyles
      }
      sx={{ "&:hover img": { transform: "scale(1.05)" }, ...addSX }}
    >
      <Box
        className={
          "w-full mob:h-auto bigDesk:h-[430px] flex items-center overflow-hidden " +
          imgBoxStyles
        }
      >
        {/* <img
          src={communityIMG}
          alt={title}
          className={
            "w-full mob:h-auto  bigDesk:h-full object-cover transition-all " +
            imgStyles
          }
        /> */}
        <Image
          className={
            "w-full mob:h-auto  bigDesk:h-full object-cover transition-all " +
            imgStyles
          }
          src={communityIMG}
          alt={title || "this is community avatar"}
          width={430}
          height={430}
          quality={100}
        />
      </Box>
      <Typography
        fontSize={{ mob: "20px", mobSm: "24px" }}
        fontWeight={"400 !important"}
        lineHeight={"120%"}
        color={"text.primary"}
        letterSpacing="-0.48px"
        className="mob:!mt-3 tab:!mt-6 !mb-4 mob:max-w-[270px] mob-sm:max-w-full"
      >
        {title}
        {verified && (
          <VerifiedSharpIcon
            sx={{
              fontSize: 16,
              color: "text.primary",
              marginLeft: "6px",
            }}
          />
        )}
      </Typography>
      {users !== "" && (
        <>
          <Box className="flex items-center justify-between gap-4 flex-wrap">
            <SingleDet name="Users Joined" value={users} />
            <SingleDet name="Free Slots Left" value={slotsLeft} />
          </Box>
          <Box
            className="absolute bottom-0 left-0 w-0 h-[1px] transition-all"
            sx={{
              backgroundColor: "text.primary",
            }}
          ></Box>
        </>
      )}
    </Link>
  );
}
