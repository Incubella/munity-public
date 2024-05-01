/* eslint-disable import/no-anonymous-default-export */
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Typography, Box, Button, Link } from "@mui/material";
import YesNoAbstainRow from "../community/YesNoAbstainRow";

export default function CustomCard({
  title,
  price,
  minted = true,
  lastSale,
  buttonText,
  backgroundImg = false,
  cardImg = "",
  buttonVariant = "text",
  showIcon = true,
  titleFontSize = "18px",
  titleColor = "primary.main",
  url = "#",
  link = false,
  cardClassNames = "",
  // cardStyle = "normal",
  buttonStyle = {}, // Additional styles for the button
  cardSX = {}, // Additional styles for the Card
  titleSX = {},
  isDAOCard = false,
  username = "",
  text = "",
  state,
  yes = {},
  no = {},
  abstain = {},
  page = "",
  onClick,
  imgCss,
  merchCardClasses = "",
}) {
  const backgroundStyle = backgroundImg
    ? `linear-gradient(180deg, rgba(16, 17, 27, 0.00) 0%, rgba(16, 17, 27, 0.80) 100%), url(${cardImg})`
    : {};

  function abbreviateBody(content, maxLength = 250) {
    // Remove Markdown and unnecessary characters
    const cleanContent = content.replace(/---[\s\S]*?---/, "").trim();
    // Convert Markdown links to plain text
    const noMarkdownLinks = cleanContent.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      "$1"
    );
    // Summarize content
    if (noMarkdownLinks.length > maxLength) {
      return noMarkdownLinks.substring(0, maxLength) + "...";
    }
    return noMarkdownLinks;
  }

  function abbreviateAddress(address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }
  return (
    <Box
      className={
        "flex flex-col items-start !bg-no-repeat bg-cover " + cardClassNames
      }
      sx={{
        color: titleColor,
        background: backgroundStyle,
        ...cardSX,
      }}
    >
      {!backgroundImg &&
        (!isDAOCard ? (
          <Box className="w-full">
            <img
              src={cardImg}
              alt={title}
              className={`w-full h-auto object-cover ${imgCss}`}
            />
          </Box>
        ) : (
          <Box
            className={"w-full flex items-center justify-between gap-2 mb-3 "}
          >
            <Box className="flex items-center gap-[12px]">
              <img
                src={"/images/profile.png"}
                alt={title}
                className="w-8 h-8 object-cover"
              />

              <Typography fontSize="16.5px" fontWeight="400">
                {abbreviateAddress(username)}
              </Typography>
            </Box>

            <Typography
              color="primary.main"
              lineHeight={"normal !important"}
              className={`uppercase ml-auto py-[5px] px-[8px] ${
                state === "closed" ? "bg-[#34A4E0]" : ""
              }`}
            >
              {state}
            </Typography>
          </Box>
        ))}
      <Box
        className={
          "flex flex-col items-start justify-between h-full " + merchCardClasses
        }
      >
        <Box className="flex flex-col items-start">
          <Typography
            fontSize={titleFontSize}
            fontWeight={`${
              backgroundImg ? "500  !important" : "400 !important"
            }`}
            className="!mt-[12px]"
            lineHeight={"normal"}
            sx={{ ...titleSX }}
          >
            {title}
          </Typography>
          {price && (
            <Typography
              fontSize="18px"
              fontWeight="400 !important"
              lineHeight={"normal"}
              className="!mt-4"
            >
              &#36;{price}
            </Typography>
          )}
          {!minted && (
            <Typography
              fontSize="18px"
              className="!mt-4 uppercase"
              lineHeight={"normal"}
            >
              Not Minted
            </Typography>
          )}
          {lastSale && (
            <Typography
              fontSize="14px"
              fontWeight={300}
              lineHeight={"normal"}
              className="!mt-4 "
              sx={{ color: "text.secondary" }}
            >
              MINT PRICE: {lastSale}
            </Typography>
          )}
          {/* Conditional rendering for DAO content */}
          {text !== "" && (
            <Box className="mt-3">
              <Typography
                fontSize="18px"
                color="text.secondary"
                lineHeight={"normal"}
              >
                {isDAOCard ? abbreviateBody(text) : text}
              </Typography>
              {/* Yes/No/Abstain Rows */}
              {isDAOCard && (
                <Box className="mt-6 flex flex-col gap-3">
                  <YesNoAbstainRow {...yes} type="Yes" />
                  <YesNoAbstainRow {...no} type="NO" />
                  <YesNoAbstainRow {...abstain} type="Abstain" />
                </Box>
              )}
            </Box>
          )}
          {!link && !isDAOCard && (
            <Button
              variant={buttonVariant}
              startIcon={showIcon && <ShoppingBasketIcon />}
              className={`${
                buttonVariant === "text" ? "!underline" : ""
              } !mt-[6px] mob:!p-0 mob:!px-[5px] tab:!py-[6px] tab:!px-[8px]`}
              sx={{
                fontSize: "16.5px",
                fontWeight: 300,
                color: "#1877A9",
                ...buttonStyle,
              }}
            >
              {buttonText}
            </Button>
          )}
        </Box>
        <Box className="flex flex-wrap items-center gap-6 mt-4">
          {page === "noData" && (
            <Button
              variant="contained"
              sx={{
                color: "primary.reversed",
                lineHeight: "120%",
              }}
              className="black uppercase"
              onClick={onClick}
            >
              Mint NFT
            </Button>
          )}
          {link && (
            <Link
              variant={buttonVariant}
              className={` `}
              sx={{
                fontSize: "16.5px",
                fontWeight: "400 !important",
                lineHeight: "19.8px",
                color: "#1877A9",
                textDecoration: "underline",
                ...buttonStyle,
              }}
              target="_blank"
              href={
                url.startsWith("http://") || url.startsWith("https://")
                  ? url
                  : `https://${url}`
              }
            >
              {buttonText}
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
}
