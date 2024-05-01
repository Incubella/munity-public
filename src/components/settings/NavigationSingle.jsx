/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import DatasetSharpIcon from "@mui/icons-material/DatasetSharp";

// Import custom tab content components
import PageTitle from "./PageTitle";
import Container from "./Container";
import Profile from "./Profile";
import CommunitySettings from "./Community/CommunitySettings";
import ContentNav from "./Community/content/ContentNav";
import NFTCreationForm from "./Community/NFTCreation/NFTCreationForm";
import CommunitySettingsSingle from "./Community/CommunitySettingsSingle";
import { useSelector } from "react-redux";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {/* Render the imported component as tab content */}
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
let iconClassNames = "!w-[30px] !h-[30px] !m-0";

const SettingsNavTabs = [
  {
    label: "PROFILE",
    icon: <PersonIcon className={iconClassNames} />,
  },
  {
    label: "COMMUNITY",
    icon: <LocalLibraryOutlinedIcon className={iconClassNames} />,
  },
  {
    label: "NOT STRUCTURED YET",
    icon: <DatasetSharpIcon className={iconClassNames} />,
  },
];

export default function SettingsNavSingle({
  hasCommunity,
  theme,
  handleSubmit,
  creatorCommunityData,
  refetchData,
  communityDataContract,
}) {
const {communityId} = communityDataContract

  return (
    <Box className="flex mob:gap-4 desk:gap-6 justify-between">
      {/* <Box
        className="overflow-hidden min-h-[1400px] max-w-[482px] pt-8 mob:hidden lap:block lap:!flex-[1_0_364px] desk:!flex-[1_0_427px]"
        sx={{ backgroundColor: "#10111B" }}
      >
        <Typography
          variant="h3"
          color={"#fff"}
          className="lap:pl-6 desk:pl-[52px] lap:!mb-8 desk:!mb-[52px]"
        >
          SETTINGS
        </Typography>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          className="mb-6 !items-start"
          aria-label="vertical nav tabs"
          indicatorColor="#fff"
        >
          {SettingsNavTabs.map(({ label, icon, index }) => (
            <Tab
              key={label}
              label={label}
              icon={icon}
              className="!text-2xl !font-normal !capitalize lap:!px-6 lap:!py-6 desk:!px-[52px] desk:!py-6 lap:gap-4 desk:gap-6 !flex-row !items-center !max-w-full w-full !justify-start"
              sx={{
                minWidth: "fit-content",
                flex: 1,
                color: "#E8E9F4",
                // padding: "24px 52px",
                borderBottom: "1px solid #E8E9F4",
                "&.Mui-selected": {
                  // Your custom styles for the active tab
                  backgroundColor: "#fff", // Example background color
                  color: "#10111B", // Example text color
                },
              }}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box> */}
      <Container>
              <PageTitle title={`#${communityId} Community Settings`} />
              <CommunitySettingsSingle
                theme={theme}
                creatorCommunityData={creatorCommunityData}
                onSave={handleSubmit}
                communityDataContract={communityDataContract}
                refetchData={refetchData}
              />
              <Box className="pb-[40px] relative overflow-hidden">
                <ContentNav creatorCommunityData={creatorCommunityData} />
              </Box>
            
      </Container>
    </Box>
  );
}
