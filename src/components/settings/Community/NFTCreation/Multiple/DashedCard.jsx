// CreateNFTCard.jsx
import { Box, Typography } from "@mui/material";
import ImageSharpIcon from "@mui/icons-material/ImageSharp";
import BtnChange from "../../../BtnChange";

const DashedCard = ({ theme, text, onChange, CSV = false }) => {
  return (
    <Box
      className={`w-full ${
        !CSV && "tab:max-w-[439px]"
      } tab:h-[200px] px-6 py-3 flex flex-col gap-6 justify-center text-center`}
      sx={{
        borderColor: "text.primary",
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${
          theme === "light" ? "%2310111B" : "white"
        }' stroke-width='2' stroke-dasharray='4%2c 6' stroke-dashoffset='12' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
    >
      <Typography fontSize="16.5px" color="text.secondary" lineHeight={"120%"}>
        {text}
      </Typography>
      {!CSV ? (
        <BtnChange icon={<ImageSharpIcon />}>
          Select Image
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif, video/mp4"
            style={{ display: "none" }}
            onChange={(e) => onChange(e.target.files[0])}
          />
        </BtnChange>
      ) : (
        <Box className="flex gap-x-6 gap-y-3 flex-wrap">
          <BtnChange containedCSS="mob:w-full tab:w-auto">
            Download bulk mint template
          </BtnChange>
          <BtnChange containedCSS="mob:w-full tab:w-auto">Upload CSV</BtnChange>
        </Box>
      )}
    </Box>
  );
};

export default DashedCard;
