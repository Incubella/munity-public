/* eslint-disable import/no-anonymous-default-export */
import { Button } from "@mui/material";

export default function BtnChange({
  children,
  icon,
  endIcon,
  containedCSS = "",
  onClick,
}) {
  return (
    <Button
      variant="contained"
      className={"!py-3 !leading-[120%] !min-w-fit " + containedCSS}
      component="label"
      sx={{ color: "primary.reversed" }}
      startIcon={icon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
