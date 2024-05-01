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
  getWeiFromEther,
  uploadFileToIPFS,
  uploadJSONToIPFS,
} from "@/utils/pinata/tools";
import { useWeb3Context } from "@/utils";
import ChangeImage from "../../Profile/ChangeImage";
import ControlledSwitches from "../ToggleInput";
import { useRouter } from "next/router";
import Hero from "@/components/main/Hero";

const categories = [
  "trending",
  "top",
  "art",
  "games",
  "music",
  "photography",
  "collectibles",
  "virtual world",
];

const NFTCreationForm = ({
  onSave,
  selectedImage,
  refetchData,
  editedData,
  theme,
  onCloseModal,
  userData,
  includeImageUpload = true,
  creatingCommunity = false,
  setLoading,
}) => {
  const router = useRouter();

  const {
    address,
    registerCommunity,
    registerCommunityLoading,
    setRegisterCommunityLoading,
    buyCommunityNft,
    addressCommunitiesData,
  } = useWeb3Context();

  const [hasCommunityCreated, setHasCommunityCreated] = useState(
    addressCommunitiesData.length > 0
  );
  const [category, setCategory] = useState("");

  const [communityDataProp, setCommunityDataProp] = useState({});
  useEffect(() => {
    if (addressCommunitiesData.length > 0) {
      const { communityId, communityData, creator, supply } =
        addressCommunitiesData[0];
      const { name, description, image, bannerImage } = communityData;
      setCommunityDataProp({
        name: name,
        communityImgUri: image,
        owner: creator,
        Url: `/settings/${communityId}`,
        slots: supply,
        description: description,
        // ownerURL: "/profile",
        // verified: true,
      });
      // router.push(`/community/${communityId}`)
    }
  }, [addressCommunitiesData]);

  const [formData, setFormData] = useState({
    image: !includeImageUpload ? selectedImage : null,
    community_avatar: "/images/communityAvatarTesting.png",
    community_banner: "/images/communityBackground.png",
    community_nft_image: null,
    name: "",
    description: "",
    key_quantity: 1,
    minting_price: 0,
    discount: 0,
    have_whitelist: false,
    uri: "",
  });

  // useEffect(() => {
  //   console.log("formData", formData);
  // }, [formData]);

  useEffect(() => {
    if (editedData) {
      // console.log(editedData);
      setFormData({
        image: editedData.key.image,
        name: editedData.name,
        description: editedData.description,
        community_avatar: editedData.community_avatar,
        community_banner: editedData.community_banner,
        key_quantity: editedData.key_quantity,
        minting_price: editedData.minting_price,
        discount: editedData.discount ? editedData.discount : "",
        have_whitelist: editedData.have_whitelist,
        uri: editedData.key.uri ? editedData.key.uri : "",
      });
    }
  }, [editedData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(e.target.name, value);
    if (name === "community_nft_image") {
      // Handle image selection separately
      const selectedImage = files[0];
      setFormData((prevData) => ({
        ...prevData,
        community_nft_image: selectedImage,
      }));

      // Display the chosen image
      const imgElement = document.getElementById("community_nft_image");
      if (imgElement && selectedImage) {
        const imageUrl = URL.createObjectURL(selectedImage);
        imgElement.style.backgroundImage = `url(${imageUrl})`;
        imgElement.style.backgroundPosition = "center";
        imgElement.style.backgroundRepeat = "no-repeat";
        imgElement.style.backgroundSize = "cover";
      }
    } else if (name === "category") {
      setCategory(value.toLowerCase());
    } else {
      // Handle other inputs
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDeleteImage = () => {
    // Implement your API logic here to delete the avatar
    console.log("Deleting nft image");
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
    // clear the chosen image
    const imgElementClear = document.getElementById("community_nft_image");
    if (imgElementClear) {
      imgElementClear.style.backgroundImage = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${
        theme === "light" ? "%2310111B" : "white"
      }' stroke-width='2' stroke-dasharray='4%2c 6' stroke-dashoffset='12' stroke-linecap='square'/%3e%3c/svg%3e")`;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Form submitted!", formData);
    const excutedData = await registerCommunity(formData);
    console.log("isExecuted:", excutedData);
    if (excutedData.isExecuted) {
      // const hasFiles = [
      //   formData.community_nft_image,
      //   formData.community_avatar,
      //   formData.community_banner,
      // ].some((item) => item instanceof File);
      let payload;
      // Convert formData to a FormData object for file handling
      // if (hasFiles) {
      //   // Use FormData for multipart request
      //   payload = new FormData();
      //   payload.append("name", formData.name);
      //   payload.append("description", formData.description);
      //   payload.append("key_quantity", formData.key_quantity);
      //   payload.append("minting_price", formData.minting_price);
      //   payload.append("discount", formData.discount);
      //   payload.append("have_whitelist", formData.have_whitelist);
      //   payload.append("uri", formData.uri);

      //   // Append files only if they are File objects
      //   if (formData.community_nft_image instanceof File) {
      //     payload.append("image", formData.community_nft_image);
      //   }
      //   if (formData.community_avatar instanceof File) {
      //     payload.append("community_avatar", formData.community_avatar);
      //   }
      //   if (formData.community_banner instanceof File) {
      //     payload.append("community_banner", formData.community_banner);
      //   }
      // } else {
      // Use JSON for regular request
      payload = JSON.stringify({
        name: formData.name,
        description: formData.description,
        community_category: category,
        key_quantity: formData.key_quantity,
        minting_price: formData.minting_price,
        discount: formData.discount,
        have_whitelist: formData.have_whitelist,
        uri: formData.uri,
        contract_community_id: excutedData?.contract_community_id || "1",
        user_id: userData?._id,
        // Include string paths for existing images
        // image: formData.community_nft_image,
        // community_avatar: formData.community_avatar,
        // community_banner: formData.community_banner,
      });
      // }
      if (editedData) {
        // Call update function (make sure it can handle both FormData and JSON payloads)
        onSave(payload, editedData._id, null);
      } else {
        // Call create function
        await onSave(payload, null, null);
        setRegisterCommunityLoading(false);
        setLoading(false);
      }
      await refetchData();
    } else {
      setLoading(true);
    }
  };

  return (
    <Card
      classNames={`mob:p-3 tab:p-4 lap:p-6 mob:mt-6 tab:mt-8 ${
        !creatingCommunity && "mb-6"
      }`}
      addSX={{ backgroundColor: "primary.reversed" }}
    >
      {hasCommunityCreated ? (
        <>
          <Hero communityData={communityDataProp} navigate={router} />
        </>
      ) : (
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
          {includeImageUpload && (
            <Box className="h-full">
              <FormHeading
                text={"NFT Creation Form"}
                classNames="border-b pb-4 w-full "
              />
              <Box
                className="biggerTab:border-r biggerTab:border-solid lap:border-none lap:pr-0 desk:border-r desk:border-solid desk:pr-[39px] biggerTab:pr-[39px] pt-6 flex flex-col"
                sx={{ borderColor: "primary.border" }}
              >
                {creatingCommunity ? (
                  <>
                    <Box
                      id="community_nft_image"
                      className="w-full mob:max-w-[320px] mob:self-center tab:max-w-[450px] mob:h-[320px] tab:h-[450px] mob:mb-4 tab:mb-3 imgWithDashedBorder "
                      sx={{
                        borderColor: "text.primary",
                        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${
                          theme === "light" ? "%2310111B" : "white"
                        }' stroke-width='2' stroke-dasharray='4%2c 6' stroke-dashoffset='12' stroke-linecap='square'/%3e%3c/svg%3e")`,
                      }}
                    ></Box>
                    <ChangeImageBtns
                      icon={<ImageSharpIcon />}
                      // containedCSS={containedCSS}
                      btnText={"Select NFT Image"}
                      handleFileChange={handleChange}
                      onClickDelete={handleDeleteImage}
                      accept={
                        "image/png, image/jpeg, image/jpg, image/gif, video/mp4"
                      }
                      text={"Supported file types : png, jpg, gif, jpeg, mp4"}
                      containedCSS="w-full"
                      inputName="community_nft_image"
                    />
                    <ChangeImage
                      title={"Community Avatar"}
                      btnText={"Update avatar"}
                      text={"Must be JPEG, PNG, or GIF and cannot exceed 10MB."}
                      imgPLaceholder={formData.community_avatar}
                      cardStyles="border-none"
                      containedCSS="mob:w-full mob-sm1:w-auto"
                      setData={setFormData}
                      inputName={"community_avatar"}
                      addSX={{ marginTop: "24px" }}
                    />
                  </>
                ) : (
                  <Box className="flex flex-col mob:gap-4 tab:gap-6 desk:gap-8">
                    <ChangeImage
                      title={"Community Avatar"}
                      btnText={"Update avatar"}
                      text={"Must be JPEG, PNG, or GIF and cannot exceed 10MB."}
                      imgPLaceholder={formData.community_avatar}
                      cardStyles="border-none"
                      containedCSS="mob:w-full mob-sm1:w-auto"
                      setData={setFormData}
                      inputName={"community_avatar"}
                    />
                    <ChangeImage
                      isCover={true}
                      title={"Community Banner"}
                      btnText={"Update cover"}
                      text={
                        "File format: JPEG, PNG, GIF (Recommended 1816x300, max 10MB)"
                      }
                      imgPLaceholder={formData.community_banner}
                      imgBox="h-[129px] !bg-center !bg-cover"
                      row={false}
                      border={false}
                      pl="w-full"
                      containedCSS="w-full"
                      cardStyles="border-none"
                      setData={setFormData}
                      inputName={"community_banner"}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}
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
              {creatingCommunity && (
                <>
                  <Box className="mt-6">
                    <CustomInput
                      label="COMMUNITY NAME"
                      type="text"
                      placeholder="Name"
                      inputName={"name"}
                      value={formData.name}
                      handleChange={handleChange}
                    />
                  </Box>
                  <Box className="mt-6">
                    <CustomInput
                      label="Description"
                      placeholder="Write description here..."
                      type="textarea"
                      inputName={"description"}
                      value={formData.description}
                      handleChange={handleChange}
                    />
                  </Box>
                </>
              )}
              <Box className="mt-6">
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
                    onChange={handleChange}
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
              <Box className="mt-6">
                <CustomInput
                  label="Price ( eth/matic )"
                  type="number"
                  inputName={"minting_price"}
                  placeholder="Price"
                  value={formData.minting_price}
                  handleChange={handleChange}
                />
              </Box>
              <Box className="mt-6">
                <CustomInput
                  label="QUANTITY/SUPPLY"
                  type="number"
                  inputName={"key_quantity"}
                  placeholder="Enter key_quantity here"
                  value={formData.key_quantity}
                  handleChange={handleChange}
                />
              </Box>
              {!creatingCommunity && (
                <Box className="mt-6">
                  <CustomInput
                    label="URI"
                    type="uri"
                    inputName={"uri"}
                    placeholder="Enter URI here"
                    value={formData.uri}
                    handleChange={handleChange}
                  />
                </Box>
              )}

              <Divider
                orientation="horizontal"
                sx={{ marginBottom: { tab: "24px", mob: "16px" } }}
              />
              <ControlledSwitches
                label={"WHITELIST"}
                isSingle={true}
                setData={setFormData}
                data={formData.have_whitelist}
                toggleClass={"mb-6"}
              />
              {formData.have_whitelist && (
                <Box>
                  <CustomInput
                    label="DISCOUNT"
                    warning="(Leave blank if you don’t want this feature)"
                    type="number"
                    inputName={"discount"}
                    placeholder="Discount"
                    value={formData.discount}
                    handleChange={handleChange}
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
                </Box>
              )}

              {creatingCommunity && (
                <ChangeImage
                  isCover={true}
                  title={"Community Banner"}
                  btnText={"Update cover"}
                  text={
                    "File format: JPEG, PNG, GIF (Recommended 1816x300, max 10MB)"
                  }
                  imgPLaceholder={formData.community_banner}
                  imgBox="h-[129px] !bg-center !bg-cover"
                  row={false}
                  border={false}
                  pl="w-full"
                  containedCSS="w-full"
                  cardStyles="border-none"
                  setData={setFormData}
                  inputName={"community_banner"}
                />
              )}
              {/* <ChangeImage
                      isCover={true}
                      title={"Community Banner"}
                      btnText={"Update cover"}
                      text={
                        "File format: JPEG, PNG, GIF (Recommended 1816x300, max 10MB)"
                      }
                      imgPLaceholder={"/images/communityBackground.png"}
                      imgBox="h-[129px] !bg-center !bg-cover"
                      row={false}
                      border={false}
                      pl="w-full"
                      containedCSS="w-full"
                      cardStyles="border-none"
                      setData={setFormData}
                      inputName={"community_banner"}
                    /> */}
              {/* Submit Button */}
              <Box
                sx={{}}
                className="flex justify-end gap-3 mob:!mt-8 tab:!mt-12 lap:!mt-16 text-right"
              >
                <Button
                  variant="contained"
                  onClick={handleSubmit}
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
                  disabled={registerCommunityLoading}
                >
                  {creatingCommunity
                    ? registerCommunityLoading
                      ? "Creating..."
                      : "Create"
                    : "Save"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default NFTCreationForm;
