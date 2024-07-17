/* eslint-disable import/no-anonymous-default-export */
import IconBtn from "./IconBtn";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

export default function ClearIcon({
  onDelete,
  Classes,
  ToolTipTitle,
  iconSX,
  ClearIconSX = { width: "14px", height: "14px" },
}) {
  return (
    <IconBtn
      icon={<ClearSharpIcon fontSize="small" sx={{ ...ClearIconSX }} />}
      onClick={onDelete}
      IconSx={{ padding: "4px", ...iconSX }}
      Classes={Classes}
      ToolTipTitle={ToolTipTitle}
    />
  );
}
