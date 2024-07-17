/* eslint-disable import/no-anonymous-default-export */
import { Typography, Box } from "@mui/material";
import Card from "../Card";
import StarText from "./starText";
import { useSelector } from "react-redux";

export default ({ title, year, progress, text, starTexts }) => {
  const { theme } = useSelector((state) => state.app);
  let starNrmColor = theme === "light" ? "#10111B" : "#FFFFFF";
  let textBgNrmColor = progress === true ? "#34A4E0" : "#F4F4F2";
  console.log("progress:", progress, "textBgNrmColor:", textBgNrmColor);
  const StarIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="mob:w-5 tab:w-6 mob:h-5 tab:h-6"
    >
      <path
        d="M12 0L16.0729 7.92706L24 12L16.0729 16.0729L12 24L7.92706 16.0729L0 12L7.92706 7.92706L12 0Z"
        fill={starNrmColor}
      />
    </svg>
  );
  return (
    <Box className="flex mob:flex-col tab:flex-row justify-between gap-6 ">
      <Box className="flex">
        <Box className="mr-6 flex flex-col items-center text-center">
          <Box>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 0L16.0729 7.92706L24 12L16.0729 16.0729L12 24L7.92706 16.0729L0 12L7.92706 7.92706L12 0Z"
                fill={progress ? "#34A4E0" : starNrmColor}
              />
            </svg>
          </Box>

          <Box
            className="w-[1.2px] h-full"
            sx={{ backgroundColor: "background.primaryBtn" }}
          ></Box>
        </Box>
        <Box className="flex flex-col items-start">
          <Typography
            fontSize={"24px"}
            fontWeight={"400 !important"}
            lineHeight={"28.8px !important"}
            color={"text.primary"}
            className="w-32"
          >
            {year}
          </Typography>
          <Typography
            className="py-[4px] px-[8px] uppercase !mt-3"
            fontSize={"14px"}
            color={"#10111B"}
            sx={{
              backgroundColor: textBgNrmColor,
            }}
          >
            {progress ? "ACHIEVED" : "IN PROGRESS"}
          </Typography>
        </Box>
      </Box>
      <div className="pb-6 w-full">
        <Card
          childrenStyles={"flex flex-col mob:gap-3 tab:gap-4 lap:gap-6 "}
          classNames={`mob:p-4 tab:p-5 lap:p-6 max-w-[976px] ${
            progress ? "bg-bgLightBlue" : "bg-transparent"
          }
          `}
        >
          <Typography
            variant="h3"
            sx={{ color: progress ? "#34A4E0" : "text.primary" }}
          >
            {title}
          </Typography>
          <Typography fontSize={"16.5px"} color={"text.secondary"}>
            {text}
          </Typography>
          <Box className="flex flex-col mob:gap-3 tab:gap-4 mob:mt-[4px] tab:mt-0">
            {starTexts.map((item, index) => (
              <Box key={index}>
                {<StarText starIcon={StarIcon} text={item.point} />}
              </Box>
            ))}
          </Box>
        </Card>
      </div>
    </Box>
  );
};
