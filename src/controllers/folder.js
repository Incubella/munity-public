const Community = require("../models/community");
import { deleteFileFromS3 } from "@/utils/upload";
import { FolderSchemaJoi } from "@/schemas";

export const createFolder = async (req, res) => {
  const { id } = req.query;
  const folderData = req.body; // Assuming folderData has all the necessary Folder fields
  // console.log("folderData:", folderData);
  const { error } = FolderSchemaJoi.validate(folderData);
  if (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
  try {
    // Push the new folder data directly into the Community document
    const community = await Community.findByIdAndUpdate(
      id,
      {
        $push: { "files_tab.folders": folderData },
      },
      { new: true }
    );

    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    // Assuming the last item in the array is the newly added folder
    const createdFolder = community.files_tab.folders.slice(-1)[0];
    if (createdFolder) {
      // console.log("created folder:", createdFolder);
      res.status(201).json({ success: true, data: createdFolder });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Folder not found after creation" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteFolder = async (req, res) => {
  const { id, folderId } = req.query;
  // console.log(req.query);
  try {
    // Find the community and the folder within it
    const community = await Community.findById(id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    // Locate the folder to be deleted
    const folderToDelete = community.files_tab.folders.find(
      (folder) => folder._id.toString() === folderId
    );

    if (!folderToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Folder not found" });
    }

    // Delete each file in the folder from S3
    for (const file of folderToDelete.files) {
      await deleteFileFromS3(file.file.split("/").pop()); // Assuming file.file contains the full URL to the file in S3
    }

    // After deleting files from S3, remove the folder from the Community document
    await Community.findByIdAndUpdate(
      id,
      { $pull: { "files_tab.folders": { _id: folderId } } },
      { new: true }
    );

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting folder:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateFolderName = async (req, res) => {
  const { id: communityId, folderId } = req.query;
  const { name: newName } = req.body; // The new name from the request body
  // console.log(communityId, folderId, newName);
  const validateFolderData = {
    name: newName,
  };
  const { error } = FolderSchemaJoi.validate(validateFolderData);
  if (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
  try {
    // Find the community document
    const community = await Community.findById(communityId);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    const folderToUpdate = community.files_tab.folders.find(
      (folder) => folder._id.toString() === folderId
    );

    if (!folderToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Folder not found" });
    }

    // Update the folder name
    folderToUpdate.name = newName;

    // Save the updated community document
    await community.save();

    res
      .status(200)
      .json({ success: true, message: "Folder name updated successfully" });
  } catch (error) {
    console.error("Error updating folder name:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
