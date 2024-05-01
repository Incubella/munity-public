/* eslint-disable import/no-anonymous-default-export */
import { Box, Link } from "@mui/material";
import FormHeading from "../../settings/Community/NFTCreation/FormHeading";

export default function Category({
  name,
  categoryIMG,
  communityQuantity,
  link,
}) {
  return (
    <Link
      href={link}
      className="w-full !no-underline"
      sx={{ "&:hover div.absolute": { width: "100%" } }}
    >
      <Box
        className="w-full h-[130px] mob:mb-4 tab:mb-6"
        sx={{
          backgroundImage: `url(${categoryIMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <img
          src={communityIMG}
          alt={title}
          className="w-full mob:h-auto biggerTab:h-full lap:h-auto bigDesk:h-full object-cover transition-all"
        /> */}
      </Box>
      <FormHeading
        text={name}
        number={communityQuantity}
        classNames="border-t pt-4"
        titleSX={{
          fontSize: "18px",
          fontWeight: "normal",
          color: "#fff",
          textTransform: "capitalize",
        }}
        boxSX={{ borderColor: "rgba(232, 233, 244, 0.20)" }}
        numberSX={{
          fontSize: "18px",
          fontWeight: "normal",
          color: "rgba(255, 255, 255, 0.60)",
        }}
      />
    </Link>
  );
}
