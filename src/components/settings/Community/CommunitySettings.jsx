/* eslint-disable import/no-anonymous-default-export */
import { Box } from "@mui/material";
import SettingsBox from "../SettingsBoxMain";
import ToggleInput from "./ToggleInput";
import Card from "../../Card";
import ChannelsCard from "./Channels/ChannelsCard";
import WhiteList from "./Whitelist/WhiteList";
import NFTCreationForm from "./NFTCreation/NFTCreationForm";

const handleFormSubmit = async (formData) => {
  // API logic here using formData
  console.log("Form submitted with data:", formData);
};

// const apiUrl = "api-endpoint"; // API URL

export default function CommunitySettings({
  theme,
  creatorCommunityData,
  onSave,
  handleToggleChange,
  setLoading,
}) {
  const CommunitySettingsTogglesConfig = [
    {
      label: "Merch",
      isPro: false,
      isChecked: creatorCommunityData.merch.is_active,
      featureKey: "merch",
    },
    {
      label: "DAO Proposals",
      isPro: false,
      isChecked: creatorCommunityData.dao_proposals.is_active,
      featureKey: "dao_proposals",
    },
    {
      label: "Articles",
      isPro: false,
      isChecked: creatorCommunityData.articles.is_active,
      featureKey: "articles",
    },
    {
      label: "Files",
      isPro: true,
      isChecked: creatorCommunityData.files_tab.is_active,
      featureKey: "files_tab",
    },
    {
      label: "Giveaways",
      isPro: false,
      isChecked: creatorCommunityData.giveaway.is_active,
      featureKey: "giveaway",
    },
    {
      label: "Roadmap",
      isPro: false,
      isChecked: creatorCommunityData.roadmaps.is_active,
      featureKey: "roadmaps",
    },
    {
      label: "Social Posts",
      isPro: false,
      isChecked: creatorCommunityData.social_posts.is_active,
      featureKey: "social_post",
    },
  ];
  return (
    <>
      <NFTCreationForm
        theme={theme}
        onSave={onSave}
        editedData={creatorCommunityData}
        // creatingCommunity={true}
      />
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

          <WhiteList />
        </Box>
        <Box className="flex flex-col mob:gap-4 tab:gap-6 desk:gap-8">
          <ChannelsCard
            creatorCommunity={creatorCommunityData}
            setLoading={setLoading}
          />
        </Box>
      </SettingsBox>
    </>
  );
}
