/* eslint-disable import/no-anonymous-default-export */
import { Box, Typography } from "@mui/material";
import BtnChange from "./BtnChange";
import IconBtn from "./IconBtn";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ChangeImageBtns({
  icon,
  containedCSS = "",
  onClickDelete,
  accept,
  btnText,
  handleFileChange,
  text,
  inputName = "img",
}) {
  return (
    <>
      <Box className={"flex items-center mob:gap-4 lap:gap-6 mb-4 !min-w-fit"}>
        <BtnChange
          icon={icon}
          containedCSS={
            containedCSS + " mob:!px-3 mob:!w-auto mob-xs:!px-6 mob-xs:!w-full"
          }
        >
          {btnText}
          <input
            type="file"
            accept={accept}
            name={inputName}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </BtnChange>
        <IconBtn
          icon={<DeleteOutlineIcon fontSize="small" />}
          onClick={onClickDelete}
        />
      </Box>
      {/* Text Row */}
      <Typography fontSize="16.5px" color="text.primary" lineHeight={"120%"}>
        {text}
      </Typography>
    </>
  );
}
