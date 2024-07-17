/* eslint-disable import/no-anonymous-default-export */
import { Typography, Box } from "@mui/material";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ViewInArSharpIcon from "@mui/icons-material/ViewInArSharp";
import InsertDriveFileSharpIcon from "@mui/icons-material/InsertDriveFileSharp";
import Card from "../Card";

export default ({ title, size, type, onFolderClick, fileType, fileUrl }) => {
  const fileSizeInMB = size && (size / (1024 * 1024)).toFixed(2);
  const getFileIcon = () => {
    if (type === "folder") {
      return <FolderZipOutlinedIcon sx={{ color: "text.primary" }} />;
    } else {
      const extention = fileType.split("/")[1]; // Get file extension from MIME type
      switch (extention) {
        case "jpeg":
        case "png":
          return <ImageOutlinedIcon sx={{ color: "text.primary" }} />;
        case "pdf":
          return <PictureAsPdfOutlinedIcon sx={{ color: "text.primary" }} />;
        case "mp4":
        case "quicktime":
          return <VideoLibraryOutlinedIcon sx={{ color: "text.primary" }} />;
        case "obj":
        case "fbx":
        case "stl":
        case "blend":
          return <ViewInArSharpIcon sx={{ color: "text.primary" }} />;
        default:
          return <InsertDriveFileSharpIcon sx={{ color: "text.primary" }} />; // Default to folder icon for unknown types
      }
    }
  };

  const handleDownload = () => {
    // const link = document.createElement("a");
    // link.href = file.file; // Assuming 'file_url' is the property where the file's URL is stored
    // link.setAttribute("download", file.file_name); // Use the 'download' attribute to specify the filename
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <Card
      onClick={type === "folder" ? onFolderClick : handleDownload}
      childrenStyles={`flex flex-wrap justify-between items-center mob:gap-3 tab:gap-4 lap:gap-6 
        cursor-pointer`}
    >
      <Box
        className="mob:w-12 mob:h-12 tab:w-14 tab:h-14 flex items-center justify-center"
        sx={{ backgroundColor: "background.iconBtn" }}
      >
        {/* <FolderZipOutlinedIcon
          className="mob:!w-[18px] mob:!h-[18px] tab:!w-6 tab:!h-6"
          sx={{ color: "text.primary" }}
        /> */}
        {getFileIcon()}
      </Box>
      <Typography
        fontSize={{
          mob: "14px",
          tab: "18px",
        }}
        fontWeight={"400 !important"}
        lineHeight={"normal !important"}
        color={"text.primary"}
      >
        {title}
      </Typography>
      <Typography
        className="!ml-auto justify-self-end"
        fontSize={{
          mob: "14px",
          tab: "18px",
        }}
        fontWeight={"400 !important"}
        lineHeight={"normal !important"}
        color={"text.tertiary"}
      >
        {size ? fileSizeInMB + " MB" : "folder"}
      </Typography>
    </Card>
  );
};
