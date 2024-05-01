/* eslint-disable import/no-anonymous-default-export */
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box } from "@mui/material";
import ContentTabs from "../../../ContentTabs/ContentTabs";
import CustomTabPanel from "../../../ContentTabs/CustomTabPanel";
import ContentsTop from "./ContentsTop";

// Import custom tab content components
import RoadmapForm from "../roadmap/RoadmapForm";
import FileSection from "../Files/Files";

const navTabs = [
  {
    label: "Merch",
    content: "",
  },
  {
    label: "DAO Proposals",
    content: "",
  },
  {
    label: "Articles",
    content: "",
  },
  {
    label: "Files",
    content: "",
  },
  {
    label: "Giveaways",
    content: "",
  },
  {
    label: "Roadmap",
    content: "",
  },
  {
    label: "Social Posts",
    content: "",
  },
];

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ContentNav({
  setCreatorCommunityData,
  creatorCommunityData,
  handleUrlChange,
  addOrUpdateRoadmap,
  deleteRoadmap,
  setLoading,
}) {
  // console.log("creatorCommunity data:", creatorCommunityData);
  const [value, setValue] = useState(0);
  const [url, setUrl] = useState("");
  const { theme } = useSelector((state) => state.app);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className=" mt-8">
      <ContentTabs
        value={value}
        handleChange={handleChange}
        type="settings"
        navTabs={navTabs}
        a11yProps={a11yProps}
        classNames={"border-b "}
      />

      <CustomTabPanel value={value} index={0} className=" relative">
        <ContentsTop
          title={"Merch"}
          label={"Shopify Link"}
          placeholder={"e.g. hhtps://Shopify.com/yourlink"}
          featureKey={"merch"}
          initialValue={creatorCommunityData.merch}
          handleFeatureChange={handleUrlChange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} className=" relative">
        <ContentsTop
          title={"Dao Proposals"}
          label={"SNAPSHOT SPACE DOMAIN"}
          placeholder={"e.x munity.eth"}
          featureKey={"dao_proposals"}
          initialValue={creatorCommunityData.dao_proposals}
          handleFeatureChange={handleUrlChange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} className=" relative">
        <ContentsTop
          title={"Articles"}
          label={"MEDIUM USERNAME"}
          placeholder={"e.g. @example"}
          featureKey={"articles"}
          initialValue={creatorCommunityData.articles}
          handleFeatureChange={handleUrlChange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} className=" relative">
        <FileSection
          setCreatorCommunityData={setCreatorCommunityData}
          creatorCommunityData={creatorCommunityData}
          setLoading={setLoading}
        />
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={4}
        className=" relative"
      ></CustomTabPanel>
      <CustomTabPanel value={value} index={5} className=" relative">
        <RoadmapForm
          deleteRoadmap={deleteRoadmap}
          addOrUpdateRoadmap={addOrUpdateRoadmap}
          creatorCommunityData={creatorCommunityData}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6} className=" relative">
        <ContentsTop
          title={"Social Posts"}
          label={"INSTAGRAM ACCOUNT LINK"}
          placeholder={"e.g. hhtps://instagram.com/yourlink"}
          featureKey={"social_posts"}
          initialValue={creatorCommunityData.social_posts?.url}
          handleFeatureChange={handleUrlChange}
        />
      </CustomTabPanel>
    </Box>
  );
}
