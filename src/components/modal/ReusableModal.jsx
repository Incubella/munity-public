import { Dialog } from "@mui/material";
import FormHeading from "../settings/Community/NFTCreation/FormHeading";

const ReusableModal = ({ isOpen, handleClose, title, children, customSX }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      sx={{
        ".MuiPaper-root": {
          borderRadius: "0",
          width: "100%",
          maxWidth: { mob: "100%", tab: "523px" },
          margin: { mob: 0, tab: "24px" },
          height: { mob: "100%", tab: "unset" },
          maxHeight: { mob: "100%", tab: "calc(100% - 64px)" },
          padding: { mob: "16px", tab: "24px", lap: "32px" },
          ...customSX,
        },
      }}
    >
      <FormHeading
        text={title}
        onCloseModal={handleClose}
        boxSX={
          customSX && {
            maxWidth: { mob: "100%", tab: "459px !important" },
            justifyContent: "unset !important",
            "& p": {
              textAlign: "center",
              justifySelf: "center",
              width: "100%",
              textTransform: "capitalize",
            },
          }
        }
      />
      {children}
    </Dialog>
  );
};

export default ReusableModal;
