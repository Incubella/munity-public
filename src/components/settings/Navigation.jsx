/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {} from "react";
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
  // {
  //   label: "NOT STRUCTURED YET",
  //   icon: <DatasetSharpIcon className={iconClassNames} />,
  // },
];

export default function SettingsNav({
  hasCommunity,
  theme,
  handleSubmit,
  setCreatorCommunityData,
  creatorCommunityData,
  communityDataContract,
  refetchData,
  handleToggleChange,
  addOrUpdateRoadmap,
  deleteRoadmap,
  setSnackbar,
  setLoading,
  userData,
  userAddress,
}) {
  const router = useRouter();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (router.query.tab === "community" || router.query.action === "create") {
      setValue(1); // Set to the index of the "COMMUNITY" tab
    } else {
      setValue(0);
    }
  }, [router]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1 && !hasCommunity) {
      router.push(
        {
          pathname: "/settings",
          query: { action: "create" },
        },
        undefined,
        { shallow: true }
      );
    } else {
      router.push(
        "/settings?tab=" + (newValue === 1 ? "community" : "profile")
      );
    }
  };

  // console.log(
  //   "communityDataContract:",
  //   communityDataContract,
  //   "creatorCommunityData:",
  //   creatorCommunityData
  // );
  return (
    <Box className="flex mob:gap-4 desk:gap-6 justify-between">
      <Box
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
      </Box>
      <Container>
        {/* Use the CustomTabPanel component with the imported components */}
        <CustomTabPanel
          value={value}
          index={0}
          className=" relative lap:mr-4 desk:mr-6"
        >
          <PageTitle title={"PROFILE DETAILS"} />
          <Profile
            userAddress={userAddress}
            setLoading={setLoading}
            userData={userData}
          />
        </CustomTabPanel>
        <CustomTabPanel
          value={value}
          index={1}
          className=" relative lap:mr-4 desk:mr-6"
        >
          {hasCommunity ? (
            communityDataContract ? (
              <>
                <PageTitle
                  title={`#${communityDataContract?.communityId} Community Settings`}
                />
                <CommunitySettingsSingle
                  theme={theme}
                  creatorCommunityData={creatorCommunityData}
                  onSave={handleSubmit}
                  communityDataContract={communityDataContract}
                  refetchData={refetchData}
                  handleToggleChange={handleToggleChange}
                  setLoading={setLoading}
                  setSnackbar={setSnackbar}
                  userData={userData}
                  userAddress={userAddress}
                />
                <Box className="pb-[40px] relative overflow-hidden">
                  <ContentNav
                    creatorCommunityData={creatorCommunityData}
                    handleUrlChange={handleToggleChange}
                    deleteRoadmap={deleteRoadmap}
                    addOrUpdateRoadmap={addOrUpdateRoadmap}
                    setLoading={setLoading}
                    setCreatorCommunityData={setCreatorCommunityData}
                  />
                </Box>

                {/* <PageTitle title={"Community Settings Mine"} />
              <CommunitySettings
                theme={theme}
                creatorCommunityData={creatorCommunityData}
                onSave={handleSubmit}
                handleToggleChange={handleToggleChange}
                setLoading={setLoading}
              />
              <Box className="pb-[40px] relative overflow-hidden">
                <ContentNav creatorCommunityData={creatorCommunityData} />
              </Box> */}
              </>
            ) : (
              <>Loading...</>
            )
          ) : (
            <>
              <PageTitle title={"CREATE COMMUNITY"} />
              <NFTCreationForm
                theme={theme}
                refetchData={refetchData}
                onSave={handleSubmit}
                creatingCommunity={true}
                setLoading={setLoading}
                userData={userData}
              />
            </>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} className=" relative">
          <Box>HIiiiiiiii</Box>
        </CustomTabPanel>
      </Container>
    </Box>
  );
}
