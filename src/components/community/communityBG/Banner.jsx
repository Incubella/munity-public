/* eslint-disable import/no-anonymous-default-export */
// import { Box } from "@mui/material";
export default function Banner({ height = "300px", bannerIMG }) {
  const backgroundImageStyle = {
    backgroundImage: `url(${bannerIMG.src || bannerIMG})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: height, // Set the desired height
  };
  return (
    <div className="absolute w-full z-0" style={backgroundImageStyle}></div>
  );
}
