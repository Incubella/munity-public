// CreateMultipleNFT.jsx
import React, { useState } from "react";
import { Box, Modal, Button } from "@mui/material";
import CreateNFTCard from "./CreateNFTCard";
import NFTCreationForm from "../NFTCreationForm";
import Card from "../../../../Card";
import DashedCard from "./DashedCard";

const CreateMultipleNFT = ({ theme, handleCreate, handleBack }) => {
  const [showModal, setShowModal] = useState(false);
  const [createdNFTs, setCreatedNFTs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedNFT, setEditedNFT] = useState(null);

  const handleUploadImage = (image) => {
    // Open the modal when an image is selected
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleSaveNFT = (nftData) => {
    // Check if we are in edit mode
    if (editedNFT !== null) {
      // Editing an existing NFT
      const updatedNFTs = [...createdNFTs];
      const editedIndex = createdNFTs.findIndex((nft) => nft === editedNFT);

      if (editedIndex !== -1) {
        // Update the existing NFT at the found index
        updatedNFTs[editedIndex] = {
          ...nftData,
          selectedImage: selectedImage,
        };
        setCreatedNFTs(updatedNFTs);
      }
    } else {
      // Creating a new NFT
      const nftWithImage = {
        ...nftData,
        selectedImage: selectedImage,
      };
      setCreatedNFTs([...createdNFTs, nftWithImage]);
    }

    // Close the modal and reset editedNFT
    setShowModal(false);
    setEditedNFT(null);
  };

  const handleEditNFT = (index) => {
    // Set the editedNFT state to the NFT at the specified index
    setEditedNFT(createdNFTs[index]);
    // Open the modal for editing
    setShowModal(true);
  };

  const handleRemoveNFT = (index) => {
    // Remove the NFT at the specified index from the state
    const updatedNFTs = [...createdNFTs];
    updatedNFTs.splice(index, 1);
    setCreatedNFTs(updatedNFTs);
  };

  return (
    <Box className="mt-14">
      {/* Image Upload Row */}

      <Card childrenStyles="flex gap-6 mob:flex-col biggerTab:flex-row lap:flex-col desk:flex-row">
        <DashedCard
          theme={theme}
          text={
            "Drop files here or click button below. Supported file types : png,jpg, gif, jpeg, mp4"
          }
          onChange={handleUploadImage}
        />
        <DashedCard
          theme={theme}
          text={
            "Drop files here or click button below. Add photos after upload. Supported file type is only .csv"
          }
          CSV={true}
        />
      </Card>
      {/* List of Created NFT Cards */}
      <Box className="flex gap-6 flex-wrap gap-y-8 mt-8">
        {createdNFTs.map((nftData, index) => (
          <CreateNFTCard
            key={index}
            nftData={nftData}
            onEdit={() => handleEditNFT(index)}
            onRemove={() => handleRemoveNFT(index)}
          />
        ))}
      </Box>

      <Box
        className={`flex gap-4 justify-center w-full text-center ${
          createdNFTs.length > 0 && "mob:mt-8 tab:mt-[40px]"
        }`}
      >
        {createdNFTs.length > 0 && (
          <Button
            variant="contained"
            onClick={() => handleCreate(createdNFTs)}
            sx={{
              padding: "16px 24px",
              fontSize: "16px",
              fontWeight: "400 !important",
              backgroundColor: "#34A4E0",
              lineHeight: "150%",
              color: "#10111B",
              textTransform: "uppercase",
            }}
          >
            Create
          </Button>
        )}
        <Button
          variant="outlined"
          sx={{
            padding: "16px 24px",
            lineHeight: "120%",
            textTransform: "uppercase",
          }}
          onClick={handleBack}
        >
          Back
        </Button>
      </Box>
      {/* Modal for NFT Creation */}
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditedNFT(null);
        }}
        className="max-w-[543px] mx-auto tab:mb-6 overflow-y-auto"
      >
        {/* NFT Creation Form */}
        <NFTCreationForm
          selectedImage={selectedImage}
          editedNFT={editedNFT}
          onSave={handleSaveNFT}
          onCancel={() => {
            setShowModal(false);
            setEditedNFT(null);
          }}
          includeImageUpload={false}
          theme={theme}
          onCloseModal={() => {
            setShowModal(false);
            setEditedNFT(null);
          }}
        />
      </Modal>
    </Box>
  );
};

export default CreateMultipleNFT;
