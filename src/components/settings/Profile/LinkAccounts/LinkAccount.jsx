import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Card from "../../../Card";
import LinkedAccount from "./LinkedAccount";
import CustomInput from "../../CustomInput";
const userSettingsSocialsConfig = [
  {
    label: "Youtube",
    inputName: "youtube",
    placeHolder: "e.g. https://youtube/channel",
  },
  {
    label: "Instagram",
    inputName: "instagram",
    placeHolder: "e.g. https://instagram/someone",
  },
  {
    label: "Discord",
    inputName: "discord",
    placeHolder: "e.g. https://discord/someone",
  },
];
export default function LinkAccount({ userData, setLoading, setSnackbar }) {
  const [socialLinks, setSocialLinks] = useState({
    youtube: userData.socials?.youtube || "",
    instagram: userData.socials?.instagram || "",
    discord: userData.socials?.discord || "",
  });
  useEffect(() => {
    setSocialLinks({
      youtube: userData.socials?.youtube || "",
      instagram: userData.socials?.instagram || "",
      discord: userData.socials?.discord || "",
    });
  }, [userData]);
  console.log("userData sdssssssssfsd:", userData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Here you would replace with the actual userId and API endpoint
    try {
      const userId = userData._id;
      const response = await fetch(`/api/users/${userId}/socials`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(socialLinks),
      });
      const responseData = await response.json(); // Parse the JSON response
      if (response.ok) {
        console.log("Social links updated successfully");
        setSnackbar({
          open: true,
          message: `User socials updated successfully`,
          severity: "success",
        });
        // Handle success
      } else {
        // const response = await response.json();
        setSnackbar({
          open: true,
          message: `Failed to update social links: ${responseData.message}`,
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error updating user text data:", error);
      // Handle error (e.g., display error message)
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card
      title={"Linked Accounts"}
      classNames="mob:p-3 tab:p-4 lap:px-3 lap:py-4 desk:p-6" // Add any custom styles for this specific card
    >
      <Box>
        <Typography
          fontSize={"16.5px"}
          sx={{ lineHeight: "120%" }}
          color={"text.primary"}
          className="!mb-6 "
        >
          These are your external accounts that are currently connected to
          Beacons.
        </Typography>
        <Box className="flex flex-col">
          {userSettingsSocialsConfig.map((item, index) => (
            <Box key={index} className="">
              <CustomInput
                label={item.label}
                inputName={item.inputName}
                placeholder={item.placeHolder}
                value={socialLinks[item.inputName]}
                handleChange={handleInputChange}
              />
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{
            padding: "16px 24px",
            fontSize: "16.5px",
            fontWeight: "400",
            "&.MuiButtonBase-root.lightBlue": {
              backgroundColor: "#34A4E0",
            },
            lineHeight: "120%",
            color: "#10111B",
          }}
          className="flex ml-auto uppercase !mt-3 lightBlue"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
    </Card>
  );
}
