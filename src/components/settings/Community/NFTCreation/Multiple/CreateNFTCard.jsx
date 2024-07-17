// CreateNFTCard.jsx
import { Box, Button } from "@mui/material";
import CustomInput from "../../../CustomInput";
import BtnChange from "../../../BtnChange";

const CreateNFTCard = ({ nftData, onEdit, onRemove }) => {
  console.log("nftData:", nftData);
  return (
    <Box className="w-full max-w-[334px]">
      {/* Display NFT Image */}
      <Box>
        {/* Replace the following line with your logic to display the NFT image */}
        <img
          src={URL.createObjectURL(nftData.selectedImage)}
          alt={nftData.name}
          className="h-[334px] object-cover"
        />
      </Box>
      {/* Display NFT Name */}
      <Box className="mt-4">
        <CustomInput
          label="Name"
          type="text"
          inputName={"name"}
          value={nftData.name}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      {/* Display NFT Description */}
      <Box className="mt-6">
        <CustomInput
          label="Description"
          placeholder="Write description here..."
          type="textarea"
          inputName={"description"}
          value={nftData.description}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      {/* Buttons for Edit and Remove */}
      <Box className="grid grid-cols-2 gap-6">
        <BtnChange onClick={() => onEdit(nftData)} containedCSS="w-full">
          Edit
        </BtnChange>
        <Button
          variant="contained"
          className={"!py-3 !leading-[120%] !min-w-fit w-full"}
          color="error"
          sx={{ color: "#B3261E" }}
          onClick={() => onRemove(nftData)}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
};

export default CreateNFTCard;
