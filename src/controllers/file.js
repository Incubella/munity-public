const Community = require("../models/community");
import { parseForm, cleanUpLocalFiles } from "@/utils/parserFuncs";
import { uploadFileToS3, deleteFileFromS3 } from "@/utils/upload";
import { FileSchemaJoi } from "@/schemas";

export const createFile = async (req, res) => {
  const { id, folderId } = req.query; // folderId is optional
  // console.log("req query", req.query);

  try {
    const { fields, files } = await parseForm(req);
    // console.log("filedata:", fileData);
    const fileData = {
      file_name: files.file[0].originalFilename,
      file_size: files.file[0].size,
      file_type: files.file[0].mimetype,
      file: files.file[0], // This will be the actual file object
      file_folder: folderId || null,
    };
    // console.log("filedata:", fileData);
    // Validate the file data using the Joi schema
    const { error } = FileSchemaJoi.validate(fileData);
    // console.log("error:", error);
    if (error) {
      // Handle validation error
      cleanUpLocalFiles(files);
      return res.status(400).json({ success: false, error: error.message });
    }
    // const fileData = files.file[0];
    const fileUrl = await uploadFileToS3(fileData.file);
    const newFile = {
      ...fileData,
      file: fileUrl,
    };
    // Determine whether to add the file to a specific folder or directly to the community
    const updatePath = folderId
      ? "files_tab.folders.$.files"
      : "files_tab.files";
    const update = { $push: { [updatePath]: newFile } };

    const filter = folderId
      ? { _id: id, "files_tab.folders._id": folderId }
      : { _id: id };
    // console.log(
    //   "filter:",
    //   filter,
    //   "update:",
    //   update,
    //   "updatePath:",
    //   updatePath
    // );
    await Community.findOneAndUpdate(filter, update, {
      new: true,
    });

    const updatedCommunity = await Community.findById(id);

    let createdFile;
    if (folderId) {
      // Access the specific folder
      const folder = updatedCommunity.files_tab.folders.find(
        (folder) => folder._id.toString() === folderId
      );
      // Assuming the files are stored in chronological order, the last one would be the most recently added
      createdFile = folder.files.slice(-1)[0]; // Get the last file from the folder
    } else {
      // If no folderId, fetch from the root files array
      createdFile = updatedCommunity.files_tab.files.slice(-1)[0]; // Get the last file from the root files array
    }
    cleanUpLocalFiles(files);
    res.status(201).json({ success: true, data: createdFile });
  } catch (error) {
    // Handle other errors
    // cleanUpLocalFiles(files);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteFile = async (req, res) => {
  const { id, folderId, fileId } = req.query; // folderId is optional

  try {
    // First, find the community and the file's URL or key within the folder
    const community = await Community.findById(id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    let fileToDelete;
    if (folderId) {
      // Remove file from a specific folder in the community
      await Community.findOneAndUpdate(
        { _id: id, "files_tab.folders._id": folderId },
        { $pull: { "files_tab.folders.$.files": { _id: fileId } } },
        { new: true }
      );
      // Assuming you have a way to find the specific file in the folder
      fileToDelete = community.files_tab.folders
        .find((folder) => folder._id.toString() === folderId)
        .files.find((file) => file._id.toString() === fileId);
      // console.log("fileTodelete:", fileToDelete);
    } else {
      // Find and remove file directly from the community
      const community = await Community.findById(id);
      fileToDelete = community.files_tab.files.find(
        (file) => file._id.toString() === fileId
      );
      await Community.findByIdAndUpdate(
        id,
        { $pull: { "files_tab.files": { _id: fileId } } },
        { new: true }
      );
    }

    if (fileToDelete) {
      // Extract the key from the file URL to delete from S3
      const fileKey = fileToDelete.file.split("/").pop();
      await deleteFileFromS3(fileKey);
    }
    res.status(204).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
