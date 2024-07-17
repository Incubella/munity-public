import React, { useCallback, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
// import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import FileSingle from "./FileSingle";
import BtnChange from "../../BtnChange";
import CustomInput from "../../CustomInput";
import IconBtn from "../../IconBtn";

async function fetchAPI(url, method, body = null, formdata = null) {
  const headers = !formdata ? { "Content-Type": "application/json" } : {};
  // console.log("url:", url, "method:", method, "formdata:", formdata);
  const config = {
    method: method,
    headers: headers,
    ...(body && { body: JSON.stringify(body) }),
    ...(formdata && { body: formdata }),
  };
  const response = await fetch(url, config);
  if (!response.ok) {
    return response;
    // throw new Error("Failed to fetch from API");
  }
  // For DELETE requests, the response might not have a body
  if (method !== "DELETE") {
    return response.json();
  }
  return response.statusText;
}

// Function to add a folder
async function addFolderAPI(communityId, folderName, parentId = null) {
  const url = `/api/communities/${communityId}/folders`;
  const body = { name: folderName, parentId: parentId };
  return fetchAPI(url, "POST", body);
}

// Function to change a folder's name
async function updateFolderNameAPI(communityId, folderId, newName) {
  const url = `/api/communities/${communityId}/folders/${folderId}`;
  const body = { name: newName };
  return fetchAPI(url, "PATCH", body); // Assume fetchAPI is already implemented
}

// Function to delete a folder
async function deleteFolderAPI(communityId, folderId) {
  console.log(folderId);
  const url = `/api/communities/${communityId}/folders/${folderId}`;
  return fetchAPI(url, "DELETE");
}

// Function to add a file to a folder or directly to the community
async function addFileAPI(communityId, formData, folderId = null) {
  // const formData = new FormData();
  // formData.append("file", fileData);
  // formData.append("communityId", communityId);
  // if (folderId) {
  //   formData.append("folderId", folderId);
  // }
  const url = folderId
    ? `/api/communities/${communityId}/folders/${folderId}/files`
    : `/api/communities/${communityId}/files`;
  return fetchAPI(url, "POST", null, formData);
}

// Function to delete a file from a folder or directly from the community
async function deleteFileAPI(communityId, fileId, folderId = null) {
  const url = folderId
    ? `/api/communities/${communityId}/folders/${folderId}/files/${fileId}`
    : `/api/communities/${communityId}/files/${fileId}`;
  return fetchAPI(url, "DELETE");
}

const FileSection = ({
  creatorCommunityData,
  setLoading,
  setCreatorCommunityData,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState(
    creatorCommunityData.files_tab.files || []
  );
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState(
    creatorCommunityData.files_tab.folders || []
  );
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [isEditingFolderName, setIsEditingFolderName] = useState(false);
  const [newFolderNameInput, setNewFolderNameInput] = useState("");

  // Filter files and folders based on the current navigation state
  const { currentFolder } = useMemo(() => {
    const currentFolder = folders.find(
      (folder) => folder._id === currentFolderId
    );
    // console.log("currentFolder:", currentFolder);
    return { currentFolder }; // This will directly return the folder object or undefined if not found
  }, [creatorCommunityData.files_tab.folders, currentFolderId, folders]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setLoading(true);

      // console.log("acceptedFiles:", acceptedFiles);
      // Map each file to an upload task
      const uploadTasks = acceptedFiles.map((file) => {
        // console.log("file:", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("communityId", creatorCommunityData._id);
        if (currentFolderId) {
          formData.append("folderId", currentFolderId);
        }
        // This returns a promise for each file upload task
        return addFileAPI(
          creatorCommunityData._id,
          formData,
          currentFolderId || null
        )
          .then((response) => ({
            ...response.data, // Assuming response.data contains the necessary file info
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            file_folder: currentFolderId || null,
          }))
          .catch((error) => {
            console.error("Error uploading file:", error);
            return null; // Handle error case, potentially returning null or an error indicator
          });
      });
      // Wait for all uploads to complete
      const uploadedFilesData = await Promise.all(uploadTasks);
      // console.log("uploadedFilesData:", uploadedFilesData);
      // Filter out any nulls in case of upload errors
      const successfulUploads = uploadedFilesData.filter(
        (file) => file !== null
      );

      if (currentFolderId) {
        // Update the specific folder with new files
        setFolders((prevFolders) =>
          prevFolders.map((folder) => {
            if (folder._id === currentFolderId) {
              return {
                ...folder,
                files: [...folder.files, ...successfulUploads],
              };
            }
            return folder;
          })
        );
        // Update the specific folder with new files in the creatorCommunityData state
        setCreatorCommunityData((prevState) => {
          const updatedFolders = prevState.files_tab.folders.map((folder) => {
            if (folder._id === currentFolderId) {
              return {
                ...folder,
                files: [...folder.files, ...successfulUploads],
              };
            }
            return folder;
          });

          return {
            ...prevState,
            files_tab: {
              ...prevState.files_tab,
              folders: updatedFolders,
            },
          };
        });
        setSnackbar({
          open: true,
          message: `${
            successfulUploads.length > 1 ? "Files" : "File"
          } have been added to the folder successfully!`,
          severity: "success",
        });
        setLoading(false); // Set loading to false after 3 seconds
      } else {
        // Or update the root level uploaded files
        console.log("successFul uploads:", successfulUploads);
        setUploadedFiles((prevFiles) => [...prevFiles, ...successfulUploads]);
        setCreatorCommunityData((prevState) => ({
          ...prevState,
          files_tab: {
            ...prevState.files_tab,
            files: [...prevState.files_tab.files, ...successfulUploads],
          },
        }));
        setSnackbar({
          open: true,
          message: `${
            successfulUploads.length > 1 ? "Files" : "File"
          } created successfully!`,
          severity: "success",
        });
        setLoading(false); // Set loading to false after 3 seconds
      }
    },
    [currentFolderId, creatorCommunityData._id]
  );

  const navigateIntoFolder = (folderId) => {
    console.log(folderId);
    setCurrentFolderId(folderId);
  };

  const navigateBack = () => {
    setIsEditingFolderName(false);
    setCurrentFolderId(null);
  };

  const handleCreateFolderClick = () => {
    setIsCreatingFolder(true);
  };

  const handleFolderNameChange = (event) => {
    setNewFolderName(event.target.value);
  };

  const handleSaveFolder = async () => {
    setLoading(true);

    try {
      let finalFolderName = newFolderName;
      let existingFolders = currentFolderId
        ? folders.find((folder) => folder._id === currentFolderId)?.files || []
        : folders;

      // Ensure unique folder name
      let suffix = 1;
      while (
        existingFolders.some((folder) => folder.name === finalFolderName)
      ) {
        finalFolderName = `${newFolderName} (${suffix++})`;
      }
      const response = await addFolderAPI(
        creatorCommunityData._id,
        finalFolderName,
        currentFolderId
      );

      if (response.success) {
        const newFolder = response.data;

        // Update local folders state
        const updatedFolders = currentFolderId
          ? folders.map((folder) => {
              if (folder._id === currentFolderId) {
                return { ...folder, files: [...folder.files, newFolder] };
              }
              return folder;
            })
          : [...folders, newFolder];

        setFolders(updatedFolders);

        // Assuming 'newFolder' contains the newly created or updated folder data from the response
        setCreatorCommunityData((prevState) => {
          let updatedFolders = [...prevState.files_tab.folders];

          if (currentFolderId) {
            // Updating an existing folder within another folder
            updatedFolders = updatedFolders.map((folder) => {
              if (folder._id === currentFolderId) {
                // Update the specific folder's files array with the new folder data
                let updatedFiles = [...folder.files];
                const existingFolderIndex = updatedFiles.findIndex(
                  (f) => f._id === newFolder._id
                );
                if (existingFolderIndex !== -1) {
                  // Rename the existing folder
                  updatedFiles[existingFolderIndex] = newFolder;
                } else {
                  // Add a new folder to the files array
                  updatedFiles.push(newFolder);
                }
                return { ...folder, files: updatedFiles };
              }
              return folder;
            });
          } else {
            // Adding a new folder at the root level or renaming an existing one
            const folderIndex = updatedFolders.findIndex(
              (f) => f._id === newFolder._id
            );
            if (folderIndex !== -1) {
              // Rename the existing folder
              updatedFolders[folderIndex] = newFolder;
            } else {
              // Add the new folder
              updatedFolders.push(newFolder);
            }
          }

          return {
            ...prevState,
            files_tab: {
              ...prevState.files_tab,
              folders: updatedFolders,
            },
          };
        });

        setIsCreatingFolder(false);
        setNewFolderName("");
        setSnackbar({
          open: true,
          message: `Folder ${finalFolderName} created successfully!`,
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: `Something is wrong with the content you provided, ERROR:${response.error}.`,
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      setSnackbar({
        open: true,
        message: "Something is wrong with the content you provided",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (fileToDelete) => {
    // Filter out the file to be deleted from the state
    // console.log("fileToDelete:", fileToDelete);
    setLoading(true);

    try {
      const response = await deleteFileAPI(
        creatorCommunityData._id,
        fileToDelete._id,
        currentFolderId || null
      );
      if (
        response.status === 204 ||
        response === "OK" ||
        response === "No Content"
      ) {
        // Update the creatorCommunityData state to reflect the deletion
        setCreatorCommunityData((prevState) => {
          // Deep copy prevState to avoid direct mutation
          let newState = JSON.parse(JSON.stringify(prevState));

          if (currentFolderId) {
            // Find the folder from which the file is being deleted
            const folderIndex = newState.files_tab.folders.findIndex(
              (folder) => folder._id === currentFolderId
            );
            if (folderIndex !== -1) {
              // Filter out the deleted file from the folder
              newState.files_tab.folders[folderIndex].files =
                newState.files_tab.folders[folderIndex].files.filter(
                  (file) => file._id !== fileToDelete._id
                );
            }
          } else {
            // The file is at the root level, directly update the files array
            newState.files_tab.files = newState.files_tab.files.filter(
              (file) => file._id !== fileToDelete._id
            );
          }

          return newState;
        });
        // Update folders and uploadedFiles states for UI consistency
        if (currentFolderId) {
          setFolders((folders) =>
            folders.map((folder) => {
              if (folder._id === currentFolderId) {
                // Update the files within the folder
                return {
                  ...folder,
                  files: folder.files.filter(
                    (file) => file._id !== fileToDelete._id
                  ),
                };
              }
              return folder;
            })
          );
        } else {
          // The file was at the root level, update uploadedFiles
          setUploadedFiles((uploadedFiles) =>
            uploadedFiles.filter((file) => file._id !== fileToDelete._id)
          );
        }
        setSnackbar({
          open: true,
          message: "File deleted successfully!",
          severity: "success",
        });
      } else {
        // If the response is not 204, attempt to parse and log the error
        setSnackbar({
          open: true,
          message:
            "File was not deleted, please refresh the page and try again!",
          severity: "error",
        });
        console.error("Error deleting file:", response);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFolderConfirmation = (folder) => {
    setFolderToDelete(folder);
    setOpenDeleteDialog(true);
  };

  const handleDeleteFolder = async (folderId) => {
    setLoading(true);

    try {
      const response = await deleteFolderAPI(
        creatorCommunityData._id,
        folderId
      );
      if (
        response.status === 204 ||
        response === "OK" ||
        response === "No Content"
      ) {
        // Checking for DELETE request success
        // Remove the deleted folder from the local state to update the UI
        const updatedFolders = folders.filter(
          (folder) => folder._id !== folderId
        );
        setFolders(updatedFolders);
        setCreatorCommunityData((prevState) => {
          // For deleting a folder
          const updatedFolders = prevState.files_tab.folders.filter(
            (folder) => folder._id !== folderId
          );

          return {
            ...prevState,
            files_tab: {
              ...prevState.files_tab,
              folders: updatedFolders,
            },
          };
        });
        // Close any open dialogs or reset state as needed
        setOpenDeleteDialog(false);
        setSnackbar({
          open: true,
          message: "Folder deleted successfully!",
          severity: "success",
        });
        setLoading(false);
      } else {
        // If the response is not 204, attempt to parse and log the error
        console.error("Error deleting folder:", response);
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "audio/mp3": [".mp3"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
      "application/zip": [".zip"],
      "model/obj": [".obj"],
      "model/fbx": [".fbx"],
      "model/stl": [".stl"],
      "model/blend": [".blend"],
    },
  });

  return (
    <Box className="mt-8">
      <Typography
        sx={{
          color: "text.primary",
          fontSize: "24px",
          lineHeight: "120%",
        }}
        className="!mb-8"
      >
        Files
      </Typography>
      <Box
        sx={{
          border: "2px dashed",
          borderColor: "text.tertiary",
          // borderRadius: "4px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "32px",
          position: "relative",
        }}
      >
        <Box
          {...getRootProps()}
          className="absolute top-0 left-0 w-full h-full z-[1]"
        ></Box>
        <input {...getInputProps()} />
        <CloudUploadOutlinedIcon sx={{ fontSize: 52, color: "text.primary" }} />

        {isDragActive ? (
          <Typography
            sx={{
              fontSize: "24px",
              color: "text.primary",
              fontWeight: "120%",
              letterSpacing: "-0.48px",
              marginTop: "12px",
            }}
          >
            Drop the file here ...
          </Typography>
        ) : (
          <Box className="text-center flex flex-col items-center gap-4 mt-4">
            <Typography
              sx={{
                fontSize: "24px",
                color: "text.primary",
                fontWeight: "120%",
                maxWidth: "205px",
                letterSpacing: "-0.48px",
              }}
            >
              Drag & Drop here or
            </Typography>
            <Box className="flex items-center gap-4">
              <BtnChange>Select File</BtnChange>
              {!currentFolderId && (
                <BtnChange
                  onClick={handleCreateFolderClick}
                  containedCSS="z-[2]"
                >
                  Create a Folder
                </BtnChange>
              )}
            </Box>
          </Box>
        )}
      </Box>
      {currentFolderId && (
        <Box className="flex items-center mb-4 mob:mt-6 tab:mt-8">
          <IconBtn
            onClick={navigateBack}
            ToolTipTitle={"Back"}
            sx={{ mr: 2 }}
            icon={<ArrowBackSharpIcon />}
          />

          {isEditingFolderName ? (
            <CustomInput
              inputBoxClasses="ml-4"
              label="FOLDER NAME"
              type="text"
              placeholder="Enter Folder Name"
              inputName="folder_name"
              value={newFolderNameInput}
              handleChange={(e) => setNewFolderNameInput(e.target.value)}
            />
          ) : (
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "18px",
                lineHeight: "120%",
              }}
              className="!ml-6"
            >
              FOLDER: {currentFolder?.name}
            </Typography>
          )}

          <BtnChange
            containedCSS={`${!isEditingFolderName && "ml-6 !py-[8px] !px-3"}`}
            onClick={() => {
              if (isEditingFolderName) {
                // Save the new folder name
                setLoading(true);

                updateFolderNameAPI(
                  creatorCommunityData._id,
                  currentFolderId,
                  newFolderNameInput
                )
                  .then((response) => {
                    if (response.success) {
                      // Update the folder name in the local folders state
                      setFolders((prevFolders) =>
                        prevFolders.map((folder) => {
                          if (folder._id === currentFolderId) {
                            return { ...folder, name: newFolderNameInput };
                          }
                          return folder;
                        })
                      );

                      // Update the folder name in the global creatorCommunityData state
                      setCreatorCommunityData((prevState) => {
                        const updatedFolders = prevState.files_tab.folders.map(
                          (folder) => {
                            if (folder._id === currentFolderId) {
                              return { ...folder, name: newFolderNameInput };
                            }
                            return folder;
                          }
                        );
                        return {
                          ...prevState,
                          files_tab: {
                            ...prevState.files_tab,
                            folders: updatedFolders,
                          },
                        };
                      });

                      setSnackbar({
                        open: true,
                        message: "Folder name updated successfully!",
                        severity: "success",
                      });
                      setIsEditingFolderName(false); // Exit edit mode
                    } else {
                      throw new Error(
                        response.message || "Failed to update folder name."
                      );
                    }
                  })
                  .catch((error) => {
                    console.error("Error updating folder name:", error);
                    setSnackbar({
                      open: true,
                      message: error.message || "Failed to update folder name.",
                      severity: "error",
                    });
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              } else {
                setIsEditingFolderName(true); // Enter edit mode
                setNewFolderNameInput(currentFolder?.name || ""); // Initialize input with current folder name
              }
            }}
          >
            {isEditingFolderName ? "Save" : "Edit"}
          </BtnChange>
        </Box>
      )}
      {isCreatingFolder && (
        <Box className="flex items-center gap-4 mb-4">
          <CustomInput
            label="FOLDER NAME"
            type="text"
            placeholder="Enter Folder Name"
            inputName={"folder_name"}
            value={newFolderName}
            handleChange={handleFolderNameChange}
          />
          <Box className="flex gap-3">
            <BtnChange onClick={handleSaveFolder}>Save</BtnChange>
            <Button
              variant="outlined"
              className="!py-3 !leading-[120%] !min-w-fit "
              sx={{
                padding: "12px 24px",

                lineHeight: "120%",
                textTransform: "uppercase",
              }}
              onClick={() => setIsCreatingFolder(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
      <Box className="flex flex-col gap-6">
        {!currentFolderId &&
          folders.map((folder, index) => (
            <FileSingle
              key={`folder-${index}`}
              folder={folder}
              name={folder.name}
              onDelete={() => handleDeleteFolderConfirmation(folder)}
              onOpenFolder={() => navigateIntoFolder(folder._id)}
            />
          ))}
        {!currentFolderId &&
          uploadedFiles.map((file, index) => (
            <FileSingle
              key={index}
              file={file}
              name={file.file_name}
              onDelete={() => handleDeleteFile(file)}
            />
          ))}
        {currentFolderId &&
          (currentFolder.files.length > 0 ? (
            currentFolder.files.map((file, index) => (
              <FileSingle
                key={index}
                file={file}
                name={file.file_name}
                onDelete={() => handleDeleteFile(file)}
              />
            ))
          ) : (
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "24px",
                lineHeight: "120%",
              }}
              className="!mx-auto !mt-12 !mb-8"
            >
              Folder is empty
            </Typography>
          ))}
      </Box>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        sx={{
          borderRadius: "0",
          ".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded": {
            borderRadius: "0",
          },
        }}
      >
        <DialogTitle>Delete Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the folder "{folderToDelete?.name}"
            and all its contents?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            onClick={() => handleDeleteFolder(folderToDelete._id)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        sx={{
          borderRadius: "0",
          backgroundColor: "#eaeaea",
        }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: "0",
            "&.MuiAlert-standardSuccess": { color: "rgb(30, 70, 32)" },
            color: "#ff3333",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FileSection;
