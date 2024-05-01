// import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TagSharpIcon from "@mui/icons-material/TagSharp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import IconBtn from "../../IconBtn";
// import axios from "axios";

export default function Channel({
  label,
  isActive = true,
  handleDeleteChannel,
  hasTag = true,
  tooltip = "Delete Channel",
}) {
  return (
    <Box
      className="flex items-center justify-between gap-4 border-b border-solid pb-4 flex-wrap"
      sx={{ borderColor: "primary.border" }}
    >
      {label && (
        <Box className="flex items-center mob:gap-4 mob-ssm:gap-6">
          {hasTag && (
            <Box>
              <TagSharpIcon sx={{ color: "text.primary" }} />
            </Box>
          )}
          <Typography
            sx={{
              fontSize: "18px",
              lineHeight: "normal",
              fontWeight: "400 !important",
              color: "text.primary",
            }}
          >
            {label}
          </Typography>
        </Box>
      )}

      <IconBtn
        onClick={() => handleDeleteChannel(label)}
        isActive={isActive}
        Classes={"!ml-auto"}
        icon={<DeleteOutlineIcon fontSize="small" />}
        ToolTipTitle={tooltip}
      />
    </Box>
  );
}
