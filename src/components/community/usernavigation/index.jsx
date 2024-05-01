/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import NoNFTs from "../noData/noNFTs";
import ContentTabs from "../../ContentTabs/ContentTabs";
import CustomTabPanel from "../../ContentTabs/CustomTabPanel";

import Merch from "../merch";
import DAOProposals from "../DAOProposals";
import Articles from "../articles";
import Files from "../files";
import RoadMap from "../roadMap";
import InstagramPosts from "../socialPosts/InstagramPosts";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function Usernavigation(props) {
  const {
    theme,
    userCommunityBalance,
    handleOpenBuyForm,
    communityDatabase,
    isCreatorOfThisCommunity,
    setLoading,
    areNFTs,
  } = props;
  const navTabs = [
    {
      label: "Merch",
      is_active: communityDatabase.merch.is_active,
      content: "",
    },
    {
      label: "DAO Proposals",
      is_active: communityDatabase.dao_proposals.is_active,
      content: "",
    },
    {
      label: "Articles",
      is_active: communityDatabase.articles.is_active,
      content: "",
    },
    {
      label: "Files",
      is_active: communityDatabase.files_tab.is_active,
      content: "",
    },
    {
      label: "Giveaways",
      is_active: communityDatabase.giveaway.is_active,
      content: "",
    },
    {
      label: "Roadmap",
      is_active: communityDatabase.roadmaps.is_active,
      content: "",
    },
    {
      label: "Social Posts",
      is_active: communityDatabase.social_posts.is_active,
      content: "",
    },
  ];
  const [value, setValue] = useState(0);
  const [areFiles] = useState(
    communityDatabase.files_tab?.files.length >= 1 ||
      communityDatabase.files_tab?.folders.length >= 1
      ? true
      : false
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <ContentTabs
        value={value}
        handleChange={handleChange}
        navTabs={navTabs}
        a11yProps={a11yProps}
        classNames={"lap:px-10 mb-6 border border-solid border-t-0"}
        addSX={{
          "& .MuiTabs-scroller": { maxWidth: "916px", margin: "0 auto" },
        }}
      />

      <CustomTabPanel value={value} index={0} className=" relative">
        <Merch
          areNFTs={areNFTs}
          merchContent={communityDatabase.merch}
          setLoading={setLoading}
        />
        {!areNFTs ? (
          <NoNFTs
            theme={theme}
            userCommunityBalance={userCommunityBalance}
            handleOpenBuyForm={handleOpenBuyForm}
          />
        ) : (
          ""
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} className=" relative">
        <DAOProposals
          DAOContent={communityDatabase.dao_proposals}
          areNFTs={areNFTs}
          setLoading={setLoading}
        />
        {!areNFTs ? (
          <NoNFTs
            theme={theme}
            userCommunityBalance={userCommunityBalance}
            handleOpenBuyForm={handleOpenBuyForm}
          />
        ) : (
          ""
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} className=" relative">
        <Articles
          ArticlesContent={communityDatabase.articles}
          areNFTs={areNFTs}
          setLoading={setLoading}
        />
        {!areNFTs ? (
          <NoNFTs
            theme={theme}
            userCommunityBalance={userCommunityBalance}
            handleOpenBuyForm={handleOpenBuyForm}
          />
        ) : (
          ""
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} className=" relative">
        <Files
          filesContent={communityDatabase.files_tab}
          areFiles={areFiles}
          areNFTs={areNFTs}
        />
        {!areNFTs ? (
          <NoNFTs
            theme={theme}
            userCommunityBalance={userCommunityBalance}
            handleOpenBuyForm={handleOpenBuyForm}
          />
        ) : (
          ""
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5} className=" relative">
        <RoadMap
          roadContent={communityDatabase.roadmaps.data}
          areNFTs={areNFTs}
        />
        {!areNFTs ? (
          <NoNFTs
            theme={theme}
            userCommunityBalance={userCommunityBalance}
            handleOpenBuyForm={handleOpenBuyForm}
          />
        ) : (
          ""
        )}
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={6}
        className=" relative min-h-[972px]"
      >
        {/* <InstagramPosts username={"leomessi"} /> */}
        {!areNFTs ? (
          <NoNFTs
            theme={theme}
            userCommunityBalance={userCommunityBalance}
            handleOpenBuyForm={handleOpenBuyForm}
          />
        ) : (
          ""
        )}
      </CustomTabPanel>
    </Box>
  );
}
