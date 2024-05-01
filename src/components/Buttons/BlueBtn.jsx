/* eslint-disable import/no-anonymous-default-export */
import { Button } from "@mui/material";
export default function BlueBtn({
  children,
  classNames = "",
  addSX = {},
  handleClick,
  color = "#fff",
  bgColor = "#1877A9",
  type = "button",
}) {
  return (
    <Button
      variant="contained"
      className={
        "!leading-[120%] !min-w-fit !uppercase customColoredBtn " + classNames
      }
      component="label"
      type={type}
      sx={{
        color: color,
        "&.MuiButtonBase-root.customColoredBtn": {
          backgroundColor: bgColor,
        },
        padding: "16px 24px",
        ...addSX,
      }}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
