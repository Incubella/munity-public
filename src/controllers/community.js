// controllers/communityController.js
import { uploadFileToS3 } from "@/utils/upload";
import { parseForm, cleanUpLocalFiles } from "@/utils/parserFuncs";
import {
  CommunityValidationSchema,
  CommunityFeatureValidationSchemaJoi,
} from "@/schemas";

const Community = require("../models/community");

export async function getAllCommunities(req, res) {
  try {
    const categoryFilter = req.query.category
      ? { community_category: req.query.category }
      : {};
    const communities = await Community.find(categoryFilter);
    console.log("communities:", communities);
    res.status(200).json({ success: true, data: communities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getCommunityById(req, res) {
  try {
    // console.log("id:", req.query.id);
    const community = await Community.findById(req.query.id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    res.status(200).json({ success: true, data: community });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export const getCommunityByContractId = async (req, res) => {
  const { communityId } = req.query; // Ensure you're getting the correct query parameter as per your API design

  try {
    const community = await Community.findOne({
      contract_community_id: communityId,
    });

    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    res.status(200).json({ success: true, data: community });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// createCommunity controller function
export const createCommunity = async (req, res) => {
  try {
    // const { fields, files } = await parseForm(req);
    // console.log("files:", files);
    let fields;
    // For JSON payload, parse the body manually
    fields = await new Promise((resolve) => {
      let rawData = "";
      req.on("data", (chunk) => (rawData += chunk));
      req.on("end", () => resolve(JSON.parse(rawData)));
    });

    // const avatarUrl = files.community_avatar
    //   ? await uploadFileToS3(files.community_avatar[0])
    //   : null;
    // const bannerUrl = files.community_banner
    //   ? await uploadFileToS3(files.community_banner[0])
    //   : null;
    // const keyImageUrl = files.image
    //   ? await uploadFileToS3(files.image[0])
    //   : null;
    // console.log("avatarUrl:", avatarUrl);
    // Construct the community data including file URLs

    const communityData = {
      ...fields,
      user_id: fields.user_id,
      // community_avatar: avatarUrl,
      // community_banner: bannerUrl,
      // key: { image: keyImageUrl },
    };
    const { error } = CommunityValidationSchema.validate(communityData);
    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
    // Create and save the new community
    const newCommunity = new Community(communityData);
    await newCommunity.save();
    // cleanUpLocalFiles(files);
    res.status(201).json({ success: true, data: newCommunity });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateCommunity = async (req, res) => {
  try {
    let fields;
    // For JSON payload, parse the body manually
    fields = await new Promise((resolve) => {
      let rawData = "";
      req.on("data", (chunk) => (rawData += chunk));
      req.on("end", () => resolve(JSON.parse(rawData)));
    });

    // Validate the incoming update data using your Joi schema
    const { error } = CommunityValidationSchema.validate(fields);
    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    // Retrieve the current community data
    const community = await Community.findById(req.query.id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    // Update community data with new values
    const updatedCommunity = await Community.findByIdAndUpdate(
      req.query.id,
      { $set: fields },
      {
        new: true,
        runValidators: true,
      }
    );

    // Respond with updated community data
    res.status(200).json({ success: true, data: updatedCommunity });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export async function deleteCommunity(req, res) {
  try {
    const deletedCommunity = await Community.findByIdAndDelete(req.query.id);
    if (!deletedCommunity) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    res.status(204).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// src/controllers/communityController.js
export async function updateFeature(req, res) {
  const { id } = req.query;
  const fields = await new Promise((resolve) => {
    let rawData = "";
    req.on("data", (chunk) => (rawData += chunk));
    req.on("end", () => resolve(JSON.parse(rawData)));
  });
  // console.log("fields:", fields);
  const { error } = CommunityFeatureValidationSchemaJoi.validate(fields);
  if (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
  try {
    const community = await Community.findById(id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    if (!community[fields.featureKey]) {
      return res
        .status(404)
        .json({ success: false, message: "Feature not found" });
    }

    // Update the feature's active status and URL if provided

    if (fields.is_active !== undefined) {
      community[fields.featureKey].is_active = fields.is_active;
    }

    if (fields.url !== undefined) {
      community[fields.featureKey].url = fields.url;
    }
    // console.log("Fields:", fields);
    if (fields.shopify_storefront_url !== undefined) {
      community[fields.featureKey].shopify_storefront_url =
        fields.shopify_storefront_url;
    }

    if (fields.shopify_access_token !== undefined) {
      community[fields.featureKey].shopify_access_token =
        fields.shopify_access_token;
    }

    await community.save();
    res.status(200).json({ success: true, data: community[fields.featureKey] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export async function getCommunityByUserId(req, res) {
  const userId = req.query.userId;
  try {
    const community = await Community.findOne({ user_id: userId });
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    res.status(200).json({ success: true, data: community });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
