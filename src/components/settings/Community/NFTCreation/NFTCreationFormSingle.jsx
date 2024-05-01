import { useState, useEffect } from "react";

import {
  Typography,
  Box,
  Button,
  InputAdornment,
  Divider,
  Select,
  FormControl,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Card from "../../../Card";
import FormHeading from "./FormHeading";
import ImageSharpIcon from "@mui/icons-material/ImageSharp";
import ChangeImageBtns from "../../ChangeImageBtns";
import CustomInput from "../../CustomInput";
import {
  getEtherFromWei,
  getWeiFromEther,
  uploadFileToIPFS,
  uploadJSONToIPFS,
} from "@/utils/pinata/tools";
import { useWeb3Context } from "@/utils";
import ChangeImage from "../../Profile/ChangeImage";
import ControlledSwitches from "../ToggleInput";

const categories = [
  "Trending",
  "Top",
  "Art",
  "Games",
  "Music",
  "Photography",
  "Collectibles",
  "Virtual World",
];

const NFTCreationFormSingle = ({
  setSnackbar,
  setLoading,
  onSave,
  selectedImage,
  editedNFT,
  theme,
  onCloseModal,
  refetchData,
  creatorCommunityData,
  communityDataContract,
  includeImageUpload = true,
  creatingCommunity = false,
}) => {
  const {
    address,
    registerCommunityLoading,
    changeCommunityTokenPrice,
    addMoreCommunitySupply,
    changeCommunityDiscount,
    alertMessage,
    changeCommunityUri,
  } = useWeb3Context();

  useEffect(() => {
    console.log("NFTCreationFormSingle", communityDataContract);
  }, [communityDataContract]);

  const { communityId, price, supply, discount, communityData } =
    communityDataContract;
  const { name, description, image, bannerImage, avatarImage } = communityData;

  const [imageDataUpdated, setImageDataUpdated] = useState({
    community_avatar: null,
    community_banner: null,
    community_nft_image: null,
  });

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [changeUriLoading, setChangeUriLoading] = useState(false);

  useEffect(() => {
    console.log("imageDataUpdated", imageDataUpdated);
  }, [imageDataUpdated]);

  const [newPrice, setNewPrice] = useState(0);
  const [newPriceChangeLoading, setnewPriceChangeLoading] = useState(false);
  const [newSupply, setNewSupply] = useState(0);
  const [newSupplyChangeLoading, setnewSupplyChangeLoading] = useState(false);
  const [newDiscount, setNewDiscount] = useState(0);
  const [newDiscountChangeLoading, setnewDiscountChangeLoading] =
    useState(false);
  const [category, setCategory] = useState(
    creatorCommunityData?.community_category || ""
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value })

    switch (name) {
      case "newName":
        setUpdatedName(value);
        break;
      case "newDescription":
        setUpdatedDescription(value);
        break;
      case "newPrice":
        setNewPrice(value);
        break;
      case "newSupply":
        setNewSupply(value);
        break;
      case "newDiscount":
        setNewDiscount(value);
        break;
      case "category":
        setCategory(value.toLowerCase());
        break;
      default:
        break;
    }
  };

  const handleSubmitNewUri = async () => {
    setLoading(true);
    try {
      let newUriData = {
        name: updatedName,
        description: updatedDescription,
        image,
        bannerImage,
        avatarImage,
      };
      setChangeUriLoading(true);
      const { community_avatar, community_banner, community_nft_image } =
        imageDataUpdated;
      if (community_nft_image) {
        const communityNftImageRes = await uploadFileToIPFS(
          community_nft_image
        );

        if (!communityNftImageRes.success) {
          throw new Error("Error Uploading NFT Image");
        }

        newUriData = { ...newUriData, image: communityNftImageRes.pinataURL };
      }

      if (community_avatar) {
        const communityAvatarRes = await uploadFileToIPFS(community_avatar);

        if (!communityAvatarRes.success) {
          throw new Error("Error Uploading NFT Avatar");
        }

        newUriData = {
          ...newUriData,
          avatarImage: communityAvatarRes.pinataURL,
        };
      }
      if (community_banner) {
        const communityBannerRes = await uploadFileToIPFS(community_banner);

        if (!communityBannerRes.success) {
          throw new Error("Error Uploading NFT Banner Image");
        }

        newUriData = {
          ...newUriData,
          bannerImage: communityBannerRes.pinataURL,
        };
      }

      console.log("newUriData", newUriData);

      const newNFTuriLinkRes = await uploadJSONToIPFS(newUriData);

      if (!newNFTuriLinkRes.success) {
        throw new Error("Error Uploading updated NFT URI data");
      }

      const isExecuted = await changeCommunityUri(
        communityId,
        newNFTuriLinkRes.pinataURL
      );
      if (isExecuted) {
        const payload = JSON.stringify({
          name: newUriData.name,
          description: newUriData.description,
          image: newUriData.image,
          community_avatar: newUriData.bannerImage,
          community_banner: newUriData.avatarImage,
          community_category: category,
        });
        try {
          const response = await fetch(
            `/api/communities/${creatorCommunityData._id}`,
            {
              method: "PUT", // Assuming you're using PATCH for updates
              headers: {
                "Content-Type": "application/json",
              },
              body: payload,
            }
          );

          const data = await response.json();
          if (response.ok) {
            console.log("Community details updated successfully");
            setSnackbar({
              open: true,
              message: "Community details updated successfully",
              severity: "success",
            });
            // Update state or perform additional actions as needed
          } else {
            throw new Error(
              data.message || "Failed to update community details"
            );
          }
        } catch (error) {
          console.error("Error updating community details:", error);
          setSnackbar({
            open: true,
            message: error.message,
            severity: "error",
          });
        }
        await refetchData();
      }
    } catch (err) {
      alertMessage(err.reason || err.message || "Something went wrong!", 2);
      console.error(err.message);
      return false;
    } finally {
      setLoading(false);
      setChangeUriLoading(false);
    }
  };

  const handlePriceSubmit = async () => {
    setLoading(true);
    setnewPriceChangeLoading(true);
    console.log("Submitted newPrice:", newPrice);
    if (newPrice == 0) {
      alert("New price cant be zero");
      setnewPriceChangeLoading(false);

      return false;
    }

    const isExecuted = await changeCommunityTokenPrice(
      communityId,
      getWeiFromEther(String(newPrice))
    );
    if (isExecuted) {
      await refetchData();
      setNewPrice(0);
    }
    setLoading(false);
    setnewPriceChangeLoading(false);
  };

  const handleSupplySubmit = async () => {
    setLoading(true);
    setnewSupplyChangeLoading(true);
    console.log("Submitted newSupply:", newSupply);
    if (newSupply == 0) {
      alert("Supply cant be zero");
      setnewSupplyChangeLoading(false);

      return false;
    }

    const isExecuted = await addMoreCommunitySupply(
      communityId,
      String(newSupply)
    );
    if (isExecuted) {
      await refetchData();
      setNewSupply(0);
    }
    setLoading(false);
    setnewSupplyChangeLoading(false);
  };

  const handleDiscountSubmit = async () => {
    setLoading(true);
    setnewDiscountChangeLoading(true);
    console.log("Submitted newDiscount:", newDiscount);
    // if (newDiscount == 0) {
    //   alert("Discount % cant be zero");
    //   setnewDiscountChangeLoading(false);

    //   return false;
    // }

    if (newDiscount > 100) {
      alert("Discount % cant be greater than 100");
      setnewDiscountChangeLoading(false);

      return false;
    }

    const isExecuted = await changeCommunityDiscount(
      communityId,
      String(newDiscount * 10)
    );
    if (isExecuted) {
      await refetchData();
      setNewDiscount(0);
    }
    setLoading(false);
    setnewDiscountChangeLoading(false);
  };

  return (
    <Card
      classNames={`mob:p-3 tab:p-4 lap:p-6 mob:mt-6 tab:mt-8 ${
        !creatingCommunity && "mb-6"
      }`}
      addSX={{ backgroundColor: "primary.reversed" }}
    >
      <Box
        className={`grid mob:grid-cols-1 mob:gap-4 biggerTab:gap-0 ${
          includeImageUpload && "biggerTab:grid-cols-2"
        } lap:grid-cols-1 lap:gap-4 desk:gap-0 ${
          includeImageUpload && "desk:grid-cols-2"
        }`}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Box className="h-full">
          <FormHeading
            text={"Upadet Community Settings"}
            classNames="border-b pb-4 w-full "
          />
          <Box
            className="biggerTab:border-r biggerTab:border-solid lap:border-none lap:pr-0 desk:border-r desk:border-solid desk:pr-[39px] biggerTab:pr-[39px] pt-6 flex flex-col"
            sx={{ borderColor: "primary.border" }}
          >
            <Box className="flex flex-col mob:gap-4 tab:gap-6 desk:gap-8">
              <Box>
                <CustomInput
                  label="COMMUNITY NAME"
                  type="text"
                  placeholder="Name"
                  inputName={"newName"}
                  value={updatedName}
                  handleChange={handleInputChange}
                  inputBoxSX={{ marginBottom: "0" }}
                />
              </Box>
              <Box>
                <CustomInput
                  label="Description"
                  placeholder="Write description here..."
                  type="textarea"
                  inputName={"newDescription"}
                  value={updatedDescription}
                  handleChange={handleInputChange}
                  inputBoxSX={{ marginBottom: "0" }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    lineHeight: "normal",
                    color: "text.primary",
                    fontWeight: "400 !important",
                  }}
                  className="uppercase mb-[8px]"
                >
                  Category
                </Typography>
                <FormControl fullWidth size="medium">
                  <Select
                    sx={{ height: "44px" }}
                    value={category}
                    onChange={handleInputChange}
                    name={"category"}
                    displayEmpty
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected || "Category"}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      Select Category
                    </MenuItem>
                    {categories.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <ChangeImage
                title={"Community NFT Image"}
                btnText={"Update nft Image"}
                text={"Must be JPEG, PNG, or GIF and cannot exceed 10MB."}
                imgPLaceholder={
                  image ? image : "/images/communityAvatarTesting.png"
                }
                cardStyles="border-none"
                containedCSS="mob:w-full mob-sm1:w-auto"
                setData={setImageDataUpdated}
                inputName={"community_nft_image"}
              />

              <ChangeImage
                title={"Community Avatar"}
                btnText={"Update avatar"}
                text={"Must be JPEG, PNG, or GIF and cannot exceed 10MB."}
                imgPLaceholder={
                  avatarImage
                    ? avatarImage
                    : "/images/communityAvatarTesting.png"
                }
                cardStyles="border-none"
                containedCSS="mob:w-full mob-sm1:w-auto"
                setData={setImageDataUpdated}
                inputName={"community_avatar"}
              />

              <ChangeImage
                isCover={true}
                title={"Community Banner"}
                btnText={"Update banner"}
                text={
                  "File format: JPEG, PNG, GIF (Recommended 1816x300, max 10MB)"
                }
                imgPLaceholder={
                  bannerImage ? bannerImage : "/images/communityBackground.png"
                }
                imgBox="h-[129px] !bg-center !bg-cover"
                row={false}
                border={false}
                pl="w-full"
                containedCSS="w-full"
                cardStyles="border-none"
                setData={setImageDataUpdated}
                inputName={"community_banner"}
              />

              <Box className="">
                <Button
                  variant="contained"
                  onClick={() => handleSubmitNewUri()}
                  className="lightBlue"
                  sx={{
                    padding: "16px 24px",
                    fontSize: "16px",
                    fontWeight: "400 !important",
                    "&.MuiButtonBase-root.lightBlue": {
                      backgroundColor: "#34A4E0",
                    },
                    lineHeight: "120%",
                    color: "#10111B",
                    textTransform: "uppercase",
                  }}
                  disabled={changeUriLoading}
                >
                  {changeUriLoading ? "Saving..." : "Save"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ======================== PRICE , SUPPLY , DISCOUNT ======================== */}

        <Box
          className={`w-full border-solid border-t mt-[36px]`}
          sx={{
            borderColor: "primary.border",
          }}
        >
          <Box
            className={`${
              includeImageUpload && "biggerTab:pl-[33px]"
            } lap:pl-0 ${includeImageUpload && "desk:pl-[33px]"}`}
          >
            <Box className="mt-6">
              <CustomInput
                label={`Current Price : ${getEtherFromWei(price)} ETH`}
                type="number"
                inputName={"newPrice"}
                value={newPrice}
                handleChange={handleInputChange}
                placeholder="New Price"
              />
              <Button
                variant="contained"
                onClick={() => handlePriceSubmit()}
                className="lightBlue"
                sx={{
                  padding: "16px 24px",
                  fontSize: "16px",
                  fontWeight: "400 !important",
                  "&.MuiButtonBase-root.lightBlue": {
                    backgroundColor: "#34A4E0",
                  },
                  lineHeight: "120%",
                  color: "#10111B",
                  textTransform: "uppercase",
                }}
                disabled={newPriceChangeLoading}
              >
                {newPriceChangeLoading ? "Updating price...." : "Update Price"}
              </Button>
            </Box>
            <Divider
              orientation="horizontal"
              sx={{
                marginBottom: { tab: "24px", mob: "16px" },
                marginTop: { tab: "10px", mob: "5px" },
              }}
            />
            <Box className="mt-6">
              <CustomInput
                label={`Current Supply : ${supply}`}
                type="number"
                inputName={"newSupply"}
                value={newSupply}
                handleChange={handleInputChange}
                placeholder="New Supply To Add"
              />
              <Button
                variant="contained"
                onClick={() => handleSupplySubmit()}
                className="lightBlue"
                sx={{
                  padding: "16px 24px",
                  fontSize: "16px",
                  fontWeight: "400 !important",
                  "&.MuiButtonBase-root.lightBlue": {
                    backgroundColor: "#34A4E0",
                  },
                  lineHeight: "120%",
                  color: "#10111B",
                  textTransform: "uppercase",
                }}
                disabled={newSupplyChangeLoading}
              >
                {newSupplyChangeLoading
                  ? "Updating supply...."
                  : "Add More Supply"}
              </Button>
            </Box>

            <Divider
              orientation="horizontal"
              sx={{
                marginBottom: { tab: "24px", mob: "16px" },
                marginTop: { tab: "10px", mob: "5px" },
              }}
            />
            <Box>
              <CustomInput
                label={`Current Discount : ${Number(discount) / 10}% `}
                // warning="(Leave blank if you don’t want this feature)"
                type="number"
                inputName={"newDiscount"}
                value={newDiscount}
                handleChange={handleInputChange}
                placeholder="New Discount Percentage"
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="!ml-4">
                      <Typography
                        sx={{
                          lineHeight: "120%",
                          fontWeight: "400 !important",
                          fontSize: "16.5px",
                          color: "text.primary",
                        }}
                      >
                        &#x25;
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                onClick={() => handleDiscountSubmit()}
                className="lightBlue"
                sx={{
                  padding: "16px 24px",
                  fontSize: "16px",
                  fontWeight: "400 !important",
                  "&.MuiButtonBase-root.lightBlue": {
                    backgroundColor: "#34A4E0",
                  },
                  lineHeight: "120%",
                  color: "#10111B",
                  textTransform: "uppercase",
                }}
                disabled={newDiscountChangeLoading}
              >
                {newDiscountChangeLoading
                  ? "Updating discount...."
                  : "Update percentage"}
              </Button>
            </Box>

            {/* Submit Button */}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default NFTCreationFormSingle;
