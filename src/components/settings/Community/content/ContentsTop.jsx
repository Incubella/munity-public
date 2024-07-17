import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

export default function ContentsTop({
  title,
  label,
  placeholder,
  initialValue,
  featureKey,
  handleFeatureChange,
}) {
  const [url, setUrl] = useState(initialValue?.url ? initialValue.url : "");
  const [featureData, setFeatureData] = useState({
    // url: initialValue?.url || "",
    // isActive: initialValue?.isActive || false,
    shopify_storefront_url: initialValue?.shopify_storefront_url || "",
    shopify_access_token: initialValue?.shopify_access_token || "",
  });
  // Function to handle save button click
  const handleSave = () => {
    // console.log("featureData:", featureData);
    handleFeatureChange(featureKey, undefined, url, featureData); // Assuming isActive is unchanged
  };
  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeatureData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Box className="mob:mt-6 tab:mt-8 lap:mt-10 flex flex-col items-start mb-8">
      <Box className="flex items-center justify-between gap-4 w-full !mb-8 flex-wrap">
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "24px",
            lineHeight: "120%",
          }}
        >
          {title}
        </Typography>
      </Box>
      {featureKey === "merch" && (
        <Box className="w-full">
          <Box className="!mb-8 w-full">
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "14px",
                lineHeight: "normal",
              }}
              className="!mb-[8px]"
            >
              Shopify storefront url
            </Typography>
            <TextField
              type="url"
              className="w-full max-w-[352px]"
              InputLabelProps={{
                shrink: false,
              }}
              placeholder={"e.g. {{your shop name}}.myshopify.com"}
              value={featureData.shopify_storefront_url}
              onChange={handleInputChange}
              name="shopify_storefront_url"
            />
          </Box>
          <Box className="!mb-8 w-full">
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "14px",
                lineHeight: "normal",
              }}
              className="!mb-[8px]"
            >
              Shopify access token
            </Typography>
            <TextField
              type="url"
              className="w-full max-w-[352px]"
              InputLabelProps={{
                shrink: false,
              }}
              placeholder={"your-access-token"}
              value={featureData.shopify_access_token}
              onChange={handleInputChange}
              name="shopify_access_token"
            />
          </Box>
        </Box>
      )}
      {featureKey !== "merch" && (
        <Box className="!mb-8 w-full">
          <Typography
            sx={{
              color: "text.primary",
              fontSize: "14px",
              lineHeight: "normal",
            }}
            className="!mb-[8px]"
          >
            {label}
          </Typography>
          <TextField
            type="url"
            className="w-full max-w-[352px]"
            InputLabelProps={{
              shrink: false,
            }}
            placeholder={placeholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Box>
      )}
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          padding: "16px 24px",
          fontSize: "16px",
          fontWeight: "400 !important",
          "&.MuiButtonBase-root.lightBlue": {
            backgroundColor: "#34A4E0",
          },
          lineHeight: "150%",
          color: "#10111B",
        }}
        className="!uppercase lightBlue"
      >
        Save
      </Button>
    </Box>
  );
}
