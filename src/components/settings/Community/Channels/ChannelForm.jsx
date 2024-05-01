import { Box, TextField, Button, Typography } from "@mui/material";

export default function ChannelForm({
  value,
  onChange,
  onSave,
  onCancel,
  isAddingChannel,
}) {
  return (
    <Box
      className={`flex flex-col gap-3 ${
        isAddingChannel ? "mob:my-6 tab:my-8" : ""
      }`}
      sx={{
        opacity: isAddingChannel ? 1 : 0,
        visibility: isAddingChannel ? "visible" : "hidden",
        transform: `translateY(${isAddingChannel ? 0 : "-100%"})`,
        height: `${!isAddingChannel ? "0px" : "auto"}`,
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
      }}
    >
      <Typography
        sx={{
          fontSize: "16.5px",
          lineHeight: "normal",
          color: "text.primary",
        }}
        className="uppercase "
      >
        Channel Title
      </Typography>
      <TextField
        fullWidth
        name={"channelName"}
        variant="outlined"
        placeholder="Type Channel's name"
        value={value}
        onChange={onChange}
      />
      <Box className="flex gap-6 mt-[4px]">
        <Button
          variant="contained"
          className="lightBlue"
          sx={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "400 !important",
            backgroundColor: "#34A4E0",
            "&.MuiButtonBase-root.lightBlue": {
              backgroundColor: "#34A4E0",
            },
            lineHeight: "120%",
            color: "#10111B",
            textTransform: "uppercase",
          }}
          onClick={onSave}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          sx={{
            padding: "12px 24px",

            lineHeight: "120%",
            textTransform: "uppercase",
          }}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
