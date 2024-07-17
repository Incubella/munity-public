/* eslint-disable import/no-anonymous-default-export */
import { Box, Card, Typography } from "@mui/material";
import BtnChange from "../../BtnChange";
import NftPLaceHolderIMG from "../../../../assets/images/accessKeyImageDark.png";

export default function NFTCard({
  containedCSS = "",
  onClick,
  BtnText,
  title,
  text,
}) {
  const backgroundStyle = `center / contain no-repeat url(${NftPLaceHolderIMG})`;
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        mb: 2,
        boxShadow: "none",
        margin: "0",
        overflow: "unset",
      }}
      className={
        "mob:max-w-[343px] tab:max-w-[302px] tab:w-[302px] h-[488px]" +
        containedCSS
      }
    >
      <Box
        className="mb-3 h-[308px] relative"
        sx={{ background: backgroundStyle, backdropFilter: "blur(4px)" }}
      ></Box>
      <Typography
        sx={{
          color: "text.primary",
          fontSize: "18px",
          fontWeight: "400 !important",
          lineHeight: "normal",
        }}
        className="!mb-4"
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: "text.secondary07",
          fontSize: "16.5px",
          lineHeight: "120%",
        }}
      >
        {text}
      </Typography>
      <BtnChange onClick={onClick} containedCSS="!w-full !mt-6">
        {BtnText}
      </BtnChange>
    </Card>
  );
}
