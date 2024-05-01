import { model, models, Schema } from "mongoose";

const RoadmapSchema = require("./roadmap");
const FolderSchema = require("./folder");
const FileSchema = require("./file"); // Assuming you have a separate File model
const SocialSchema = require("./social");
const KeySchema = require("./key");
const ChannelSchema = require("./channel");

const communitySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    community_avatar: { type: String },
    community_banner: { type: String },
    is_verified: { type: Boolean, default: false },
    chain: { type: String },
    socials: [SocialSchema],
    have_whitelist: { type: Boolean },
    discount: { type: Number },
    uri: { type: String },
    merch: {
      shopify_storefront_url: { type: String },
      shopify_access_token: { type: String },
      is_active: { type: Boolean, default: false },
    },
    dao_proposals: {
      url: String,
      is_active: { type: Boolean, default: true },
    },
    articles: {
      url: String,
      is_active: { type: Boolean, default: true },
    },
    giveaway: {
      url: String,
      is_active: { type: Boolean, default: false },
    },
    social_posts: {
      url: String,
      is_active: { type: Boolean, default: false },
    },

    files_tab: {
      files: [FileSchema],
      folders: [FolderSchema],
      is_active: { type: Boolean, default: false },
    },
    roadmaps: {
      type: { type: String, enum: ["Monthly", "Quarterly"] }, // monthly or quarterly
      is_active: { type: Boolean, default: true },
      data: [RoadmapSchema],
    },
    channels: [ChannelSchema],
    // general_chat_id: { type: String },
    community_category: {
      type: String,
      required: true,
      enum: [
        "trending",
        "top",
        "art",
        "games",
        "music",
        "photography",
        "collectibles",
        "virtual world",
      ],
    },
    minting_price: { type: Number, default: 0 },
    key_quantity: { type: Number, default: 100 },
    key: KeySchema,
    keys_left: Number,
    users_joined: Number,
    user_id: {
      type: String,
      required: true,
    },
    contract_community_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = models?.Community || model("Community", communitySchema);
