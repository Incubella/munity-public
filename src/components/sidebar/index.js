/* eslint-disable import/no-anonymous-default-export */
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleLiveChat, toggleFullscreen } from "../../utils/store/reducers";
import MenuOpenSharpIcon from "@mui/icons-material/MenuOpenSharp";
import OpenInFullSharpIcon from "@mui/icons-material/OpenInFullSharp";
import CloseFullscreenSharpIcon from "@mui/icons-material/CloseFullscreenSharp";
import styles from "./sidebar.module.scss";
import Image from "next/image";

export default ({ children, areNFTs }) => {
  const dispatch = useDispatch();
  const { showLiveChat, showFullscreen } = useSelector((state) => state.app);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lap"));
  const toggleSidebar = () => dispatch(toggleLiveChat(!showLiveChat));
  const toggleFull = () =>
    isLargeScreen
      ? dispatch(toggleFullscreen(!showFullscreen))
      : dispatch(toggleLiveChat(!showLiveChat));

  return (
    <Box
      className={
        styles["sidebar"] +
        ` z-30 ` +
        (showFullscreen ? styles["fullscreen"] : "")
      }
      data-collapse={!showLiveChat}
    >
      <Box className={styles["content"]} data-full={showFullscreen}>
        <Box
          className={styles["top"] + ` mob:!p4 tab:!p-6`}
          sx={{ flexDirection: showLiveChat ? "row" : "column" }}
          data-collapse={!showLiveChat}
        >
          <Box
            className={
              styles["toggle"] + " lap:!flex items-center justify-center"
            }
            onClick={() => {
              toggleSidebar();
              if (showFullscreen) toggleFull();
            }}
            style={{
              marginBottom: !showLiveChat ? "1rem" : "0",
              display: !showLiveChat ? "none" : "flex",
            }}
          >
            <MenuOpenSharpIcon sx={{ fontSize: 24, color: "#fff" }} />
          </Box>

          <Typography
            color="secondary"
            className={styles["collapsedTitle"]}
            onClick={toggleSidebar}
            sx={{ display: showLiveChat ? "none" : "flex" }}
          >
            <span className={styles["dot"]}>•</span>&nbsp;Live Chat
          </Typography>
          <Typography
            color="secondary"
            className={styles["title"]}
            onClick={toggleSidebar}
            sx={{ display: !showLiveChat ? "none" : "block" }}
          >
            Live Chat
          </Typography>
          <Box
            className={styles["toggle"] + " flex items-center justify-center"}
            onClick={toggleFull}
            style={{
              display: !showLiveChat ? "none" : "flex",
            }}
          >
            {isLargeScreen ? (
              !showFullscreen ? (
                <OpenInFullSharpIcon sx={{ fontSize: 24, color: "#fff" }} />
              ) : (
                <CloseFullscreenSharpIcon
                  sx={{ fontSize: 24, color: "#fff" }}
                />
              )
            ) : (
              <CloseFullscreenSharpIcon sx={{ fontSize: 24, color: "#fff" }} />
            )}
          </Box>
        </Box>
        <Box
          sx={{ display: showLiveChat ? "block" : "none", height: "100%" }}
          // className="mob:px-0 tab:px-8 lap:px-10"
        >
          {areNFTs && children}
        </Box>
      </Box>
    </Box>
  );
};
