import Card from "../../../Card";
import { Box, Tooltip, Typography } from "@mui/material";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ViewInArSharpIcon from "@mui/icons-material/ViewInArSharp";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
import DownloadingOutlinedIcon from "@mui/icons-material/DownloadingOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconBtn from "../../IconBtn";

const FileSingle = ({ file, onDelete, folder, name, onOpenFolder }) => {
  const fileSizeInMB = file && (file.file_size / (1024 * 1024)).toFixed(2);

  const getFileIcon = () => {
    if (folder) {
      return <FolderZipOutlinedIcon sx={{ color: "text.primary" }} />;
    } else {
      const fileType = file?.file_type?.split("/")[1]; // Get file extension from MIME type
      switch (fileType) {
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
          return <FolderZipOutlinedIcon sx={{ color: "text.primary" }} />; // Default to folder icon for unknown types
      }
    }
  };

  // Function to handle file download
  const handleDownload = () => {
    // const link = document.createElement("a");
    // link.href = file.file; // Assuming 'file_url' is the property where the file's URL is stored
    // link.setAttribute("download", file.file_name); // Use the 'download' attribute to specify the filename
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
    window.open(file.file, "_blank", "noopener,noreferrer");
  };
  return (
    <Card childrenStyles="flex items-center gap-4 justify-between flex-wrap">
      <Box
        className="flex items-center mob:gap-4 tab:gap-6 flex-wrap"
        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        <Box
          className="mob:w-12 mob:h-12 tab:w-14 tab:h-14 flex items-center justify-center"
          sx={{ backgroundColor: "background.iconBtn" }}
        >
          {getFileIcon()}
        </Box>
        <Tooltip title={!file ? "Open folder" : "Open file"} arrow>
          <Typography
            sx={{
              fontSize: "18px",
              color: "text.primary",
              fontWeight: "normal",
              cursor: "pointer",
            }}
            onClick={!file ? onOpenFolder : handleDownload}
          >
            {name}
          </Typography>
        </Tooltip>
      </Box>
      <Box className="flex items-center gap-4 ml-auto">
        <Typography
          sx={{
            // fontWeight: "400 !important",
            fontSize: "18px",
            color: "text.secondary",
            fontWeight: "normal",
          }}
        >
          {file ? fileSizeInMB + " MB" : "folder"}
        </Typography>
        {/* <IconButton color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton> */}
        {file && (
          <IconBtn
            icon={<DownloadingOutlinedIcon fontSize="small" />}
            ToolTipTitle={"Download File"}
            onClick={handleDownload}
          />
        )}
        <IconBtn
          icon={<DeleteOutlineIcon fontSize="small" />}
          ToolTipTitle={file ? "Delete file" : "Delete folder"}
          onClick={onDelete}
        />
      </Box>
    </Card>
  );
};

export default FileSingle;
