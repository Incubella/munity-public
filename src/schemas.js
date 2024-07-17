const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const supportedFileTypes = ["mp4", "mp3", "jpeg", "png", "jpg", "pdf", "zip"];
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
// Add more 3D model file types to this array as needed
const supported3DModelFileTypes = ["obj", "fbx", "stl", "blend"];

const FileSchemaJoi = Joi.object().keys({
  file_name: Joi.string()
    .required()
    .custom((value, helpers) => {
      const extension = value.split(".").pop().toLowerCase();
      if (
        !supportedFileTypes.includes(extension) &&
        !supported3DModelFileTypes.includes(extension)
      ) {
        return helpers.message(
          `File type not supported. Only ${supportedFileTypes.join(
            ", "
          )} and 3D model file types are allowed.`
        );
      }
      return value;
    }),
  // file_name: Joi.string(),
  file_size: Joi.number(),
  file_type: Joi.string(),
  file: Joi.any().required(), // For file upload, it might need custom validation
  file_folder: Joi.any(),
});

// Custom validation for social links
const socialLink = Joi.string()
  .allow("")
  .custom((value, helpers) => {
    // Allow empty strings and valid URLs
    if (
      value &&
      !value.startsWith("http://") &&
      !value.startsWith("https://")
    ) {
      return helpers.error("string.invalidUrl");
    }
    return value;
  }, "Social Link Validation");
// Helper function to validate social links
const isValidSocialLink = (link) => {
  // Allow empty strings as valid input
  if (link === "") return true;

  const { error } = socialLink.validate(link);
  return !error;
};

// schema for user validation
const userSchemaJoi = Joi.object({
  first_name: Joi.string().trim().escapeHTML(),
  last_name: Joi.string().trim().escapeHTML(),
  username: Joi.string().trim().escapeHTML(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .escapeHTML(),
  about: Joi.string().trim().escapeHTML(),
});

// schema for key validation
const KeySchemaJoi = Joi.object().keys({
  image: Joi.string().uri(), // Assuming image is a URL
  name: Joi.string(),
  chain: Joi.string(), // Validate based on your requirements
  description: Joi.string(),
  quantity: Joi.number().integer().min(1).default(1),
  price: Joi.number().min(0).default(0),
  community_id: Joi.string(),
});

// Joi validation for FolderSchema
const FolderSchemaJoi = Joi.object().keys({
  name: Joi.string().required(),
  community_id: Joi.string(),
  files: Joi.array().items(FileSchemaJoi),
  parentId: Joi.any(),
});
// Joi validation for FolderSchema
const ChannelSchemaJoi = Joi.object().keys({
  title: Joi.string().required(),
  chat_id: Joi.number().required(),
});

// Joi validation for RoadmapSchema
const RoadmapSchemaJoi = Joi.object().keys({
  title: Joi.string().required(),
  date: Joi.string().required(),
  description: Joi.string().required(),
  points: Joi.array().items({
    point: Joi.string(),
  }),
  achieved: Joi.boolean(),
  isModified: Joi.boolean(),
});

const CommunityFeatureValidationSchemaJoi = Joi.object({
  featureKey: Joi.string(),
  is_active: Joi.boolean(),
  url: Joi.any().allow(""),
  shopify_storefront_url: Joi.string().allow(""),
  shopify_access_token: Joi.any().allow(""),
});

// schema for community validation
const CommunityValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  community_avatar: Joi.string(),
  community_banner: Joi.string(),
  community_category: Joi.string()
    .valid(...categories)
    .required(),
  is_verified: Joi.boolean(),
  chain: Joi.string(),
  uri: Joi.string().allow(""),
  have_whitelist: Joi.boolean(),
  discount: Joi.number().min(0),
  socials: Joi.array().items({
    name: Joi.string().allow(null),
    url: Joi.string(),
    icon: Joi.string().allow(null),
    user_id: Joi.string(),
  }),
  merch: {
    url: Joi.string().allow(""),
    is_active: Joi.boolean(),
  },
  dao_proposals: {
    url: Joi.string().allow(""),
    is_active: Joi.boolean(),
  },
  articles: {
    url: Joi.string().allow(""),
    is_active: Joi.boolean(),
  },
  giveaway: {
    url: Joi.string().allow(""),
    is_active: Joi.boolean(),
  },
  social_posts: {
    url: Joi.string().allow(""),
    is_active: Joi.boolean(),
  },
  files_tab: {
    files: Joi.array().items(FileSchemaJoi),
    folders: Joi.array().items(FolderSchemaJoi), // Define FolderSchemaJoi separately
    is_active: Joi.boolean(),
  },
  roadmaps: {
    type: Joi.string().valid("Monthly", "Quarterly"),
    is_active: Joi.boolean(),
    data: Joi.array().items(RoadmapSchemaJoi), // Define RoadmapSchemaJoi separately
  },
  minting_price: Joi.number().min(0),
  key_quantity: Joi.number().min(0),
  key: KeySchemaJoi,
  keys_left: Joi.number(),
  users_joined: Joi.number(),
  user_id: Joi.string(),
  contract_community_id: Joi.string(),
  image: Joi.string(),
});
module.exports = {
  FileSchemaJoi,
  KeySchemaJoi,
  ChannelSchemaJoi,
  userSchemaJoi,
  CommunityValidationSchema,
  CommunityFeatureValidationSchemaJoi,
  RoadmapSchemaJoi,
  FolderSchemaJoi,
  isValidSocialLink,
  // ... export other schemas
};
