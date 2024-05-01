/* eslint-disable import/no-anonymous-default-export */
import { Box } from "@mui/material";
import SettingsBox from "../SettingsBoxMain";
import ToggleInput from "./ToggleInput";
import Card from "../../Card";
import ChannelsCard from "./Channels/ChannelsCard";
// import WhiteList from "./Whitelist/WhiteList";
import NFTCreationFormSingle from "./NFTCreation/NFTCreationFormSingle";
// import { useEffect } from "react";
import WhiteListSingle from "./Whitelist/WhiteListSingle";
// import NFTCreationForm from "./NFTCreation/NFTCreationForm";

const handleFormSubmit = async (formData) => {
  // API logic here using formData
  console.log("Form submitted with data:", formData);
};

// const apiUrl = "api-endpoint"; // API URL

export default function CommunitySettingsSingle({
  theme,
  creatorCommunityData,
  communityDataContract,
  onSave,
  handleToggleChange,
  setLoading,
  setSnackbar,
  refetchData,
  userData,
  userAddress,
}) {
  const CommunitySettingsTogglesConfig = [
    {
      label: "Merch",
      isPro: false,
      isChecked: creatorCommunityData && creatorCommunityData.merch?.is_active,
      featureKey: "merch",
    },
    {
      label: "DAO Proposals",
      isPro: false,
      isChecked:
        creatorCommunityData && creatorCommunityData.dao_proposals?.is_active,
      featureKey: "dao_proposals",
    },
    {
      label: "Articles",
      isPro: false,
      isChecked:
        creatorCommunityData && creatorCommunityData.articles?.is_active,
      featureKey: "articles",
    },
    {
      label: "Files",
      isPro: true,
      isChecked:
        creatorCommunityData && creatorCommunityData.files_tab?.is_active,
      featureKey: "files_tab",
    },
    {
      label: "Giveaways",
      isPro: false,
      isChecked:
        creatorCommunityData && creatorCommunityData.giveaway?.is_active,
      featureKey: "giveaway",
    },
    {
      label: "Roadmap",
      isPro: false,
      isChecked:
        creatorCommunityData && creatorCommunityData.roadmaps?.is_active,
      featureKey: "roadmaps",
    },
    {
      label: "Social Posts",
      isPro: false,
      isChecked:
        creatorCommunityData && creatorCommunityData.social_posts?.is_active,
      featureKey: "social_posts",
    },
  ];
  return (
    <>
      <NFTCreationFormSingle
        theme={theme}
        onSave={onSave}
        editedData={creatorCommunityData}
        communityDataContract={communityDataContract}
        creatorCommunityData={creatorCommunityData}
        refetchData={refetchData}
        setLoading={setLoading}
        setSnackbar={setSnackbar}
        // creatingCommunity={true}
      />
      <Box className=" mb-6">
        <WhiteListSingle
          setLoading={setLoading}
          communityDataContract={communityDataContract}
          refetchData={refetchData}
        />
      </Box>
      <SettingsBox>
        <Box className="flex flex-col mob:gap-4 tab:gap-6 desk:gap-8">
          <Card childrenStyles="flex flex-col gap-6" title={"Features"}>
            {CommunitySettingsTogglesConfig.map((item, index) => (
              <ToggleInput
                key={index}
                label={item.label}
                isPro={item.isPro}
                isSingle={true}
                data={item.isChecked}
                featureKey={item.featureKey}
                handleToggleChange={handleToggleChange}
              />
            ))}
          </Card>
        </Box>
        <Box className="flex flex-col mob:gap-4 tab:gap-6 desk:gap-8">
          <ChannelsCard
            userAddress={userAddress}
            userData={userData}
            creatorCommunity={creatorCommunityData}
            setLoading={setLoading}
          />
        </Box>
      </SettingsBox>
    </>
  );
}
