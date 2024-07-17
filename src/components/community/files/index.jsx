import { useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import IconBtn from "@/components/settings/IconBtn";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";

import FileCard from "../fileCard";
import NoFiles from "../noData/noFiles";

export default function Files(props) {
  const { filesContent, areFiles, areNFTs } = props;
  const [openFolderId, setOpenFolderId] = useState(null);
  const navigateBack = () => {
    setOpenFolderId(null);
  };
  const handleOpenFolder = (folderId) => {
    setOpenFolderId(folderId);
  };
  const { currentFolder } = useMemo(() => {
    console.log("filesContent.folders:", filesContent.folders);
    console.log("openFolderId:", openFolderId);

    const currentFolder = filesContent.folders.find(
      (folder) => folder._id === openFolderId
    );
    console.log("currentFolder:", currentFolder);
    return { currentFolder }; // This will directly return the folder object or undefined if not found
  }, [filesContent.folders, openFolderId]);
  return (
    <Box className={`${!areNFTs ? "blur-[10px] pb-4 min-h-[972px]" : ""}`}>
      {openFolderId && (
        <Box className="flex items-center mb-4 mob:mt-6 tab:mt-8">
          <IconBtn
            onClick={navigateBack}
            ToolTipTitle={"Back"}
            sx={{ mr: 2 }}
            icon={<ArrowBackSharpIcon />}
          />
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
        </Box>
      )}
      {areFiles ? (
        // <LoadmoreShowLess
        //   classNames={`grid mob:grid-cols-1 lap:grid-cols-2 mob:gap-3 tab:gap-6 `}
        //   nav={"files"}
        //   data={filesContent}
        //   initialItems={8}
        //   step={8}
        //   renderItem={(item) => (
        //     <FileCard title={item.label} size={item.size} />
        //   )}
        // />
        <Box
          sx={{ width: "100%" }}
          className={"grid mob:grid-cols-1 lap:grid-cols-2 mob:gap-3 tab:gap-6"}
        >
          {!openFolderId &&
            filesContent.folders.map((item, index) => (
              <FileCard
                key={index}
                title={item.name}
                type="folder"
                onFolderClick={() => handleOpenFolder(item._id)}
              />
            ))}
          {!openFolderId &&
            filesContent?.files.map((file, index) => (
              <FileCard
                key={index}
                title={file.file_name}
                size={file.file_size}
                fileType={file.file_type}
                fileUrl={file.file}
                type="file"
              />
            ))}
          {openFolderId &&
            (currentFolder?.files.length > 0 ? (
              currentFolder.files.map((file, index) => (
                <FileCard
                  key={index}
                  title={file.file_name}
                  size={file.file_size}
                  fileType={file.file_type}
                  fileUrl={file.file}
                  type="file"
                />
              ))
            ) : (
              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: "24px",
                  lineHeight: "120%",
                  gridColumn: "span 2",
                }}
                className="!mx-auto !mt-12 !mb-8"
              >
                Folder is empty
              </Typography>
            ))}
        </Box>
      ) : (
        <NoFiles
          image={"/images/nofiles.png"}
          text="Files is not uploaded yet"
        />
      )}
    </Box>
  );
}
