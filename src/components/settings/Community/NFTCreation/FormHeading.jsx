import { Box, Typography } from "@mui/material";
import ClearIcon from "../../ClearIcon";
const FormHeading = ({
  text,
  onCloseModal,
  classNames = "border-b pb-4 max-w-[450px]",
  number,
  titleSX,
  boxSX,
  numberSX,
}) => {
  return (
    <Box
      className={
        `w-full relative border-solid flex items-center justify-between  ${
          onCloseModal && "max-w-full gap-4"
        } ` + classNames
      }
      sx={{
        borderColor: "primary.border",
        ...boxSX,
      }}
    >
      <Box
        className="absolute top-0 left-0 w-0 h-[1px] transition-all"
        sx={{
          backgroundColor: "#fff",
        }}
      ></Box>
      <Typography
        sx={{
          color: "text.primary",
          fontWeight: "400 !important",
          fontSize: "16.5px",
          lineHeight: "120%",
          textTransform: "uppercase",
          ...titleSX,
        }}
      >
        {text}
      </Typography>
      {onCloseModal && (
        <ClearIcon
          onDelete={onCloseModal}
          iconSX={{
            color: "text.primary",
            zIndex: "1",
            width: { mob: "48px", tab: "56px" },
            height: { mob: "48px", tab: "56px" },
          }}
          ClearIconSX={{
            width: { mob: "18px", tab: "24px" },
            height: { mob: "18px", tab: "24px" },
          }}
          ToolTipTitle={"Close Modal"}
        />
      )}
      {number && (
        <Typography
          sx={{
            color: "text.tertiary",
            fontWeight: "400 !important",
            fontSize: "24px",
            lineHeight: "120%",
            letterSpacing: "-0.48px",
            ...numberSX,
          }}
        >
          {number}
        </Typography>
      )}
    </Box>
  );
};

export default FormHeading;
