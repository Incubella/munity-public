/* eslint-disable import/no-anonymous-default-export */
import { IconButton, Tooltip, Box } from "@mui/material";

export default function IconBtn({
  onClick,
  isActive = true,
  Classes,
  icon,
  IconSx = {},
  ToolTipTitle,
}) {
  return (
    <Tooltip title={ToolTipTitle} arrow>
      <Box className={Classes}>
        <IconButton
          size="small"
          className={"!border !border-solid "}
          sx={{
            color: "text.primary",
            backgroundColor: "transparent",
            borderRadius: "unset",
            padding: "11px",
            borderColor: "background.primaryBtn",
            ...IconSx,
          }}
          onClick={onClick}
          // aria-label="delete"
          disabled={!isActive}
        >
          {icon}
        </IconButton>
      </Box>
    </Tooltip>
  );
}
