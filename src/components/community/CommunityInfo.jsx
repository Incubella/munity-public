import { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

export default function CommunityInfo({ communityDataContract }) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const text = communityDataContract?.about;
  const shortText =
    "My name is Iman Gadzhi. I started this channel in 2015: before I'd found any success - so scroll back to see me trying to be a personal...";
  const shortTextLength = shortText.length; // Define the length at which you want to truncate

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const truncatedText = truncateText(text, shortTextLength);
  return (
    <Box className="!mt-0 lap:max-w-250 mob:w-full mob:max-w-none">
      <Typography
        fontSize="14px"
        fontWeight={300}
        lineHeight={"20px"}
        sx={{ color: "text.secondary" }}
      >
        {truncatedText}
      </Typography>
      {text.length >= shortText.length && (
        <Box className="mt-1">
          <Typography
            fontSize="14px"
            className="cursor-pointer underline"
            fontWeight={"300"}
            color="#1877A9"
            onClick={handleOpenDialog}
          >
            Read more
          </Typography>
        </Box>
      )}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        className="!rounded-none"
        sx={{
          "& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded": {
            borderRadius: "0",
          },
        }}
      >
        <DialogTitle id="dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">{text}</DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
