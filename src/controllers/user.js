import User from "../models/user"; // Assuming your User model path is correct
import { uploadFileToS3 } from "@/utils/upload";
import { userSchemaJoi, isValidSocialLink } from "@/schemas";
import uniqid from "uniqid";
import { parseForm, cleanUpLocalFiles } from "@/utils/parserFuncs";

export async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Create a new user with a wallet address
export const createUser = async (req, res) => {
  const { address } = req.body;
  try {
    // Check if user already exists to prevent duplicate entries
    const existingUser = await User.findOne({ address });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      address: address,
      username: `user_${uniqid()}`,
    });
    // console.log("newUser:", newUser);
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get user by wallet address
export const getUserByAddress = async (req, res) => {
  const { address } = req.query; // Assuming the address is sent as a query parameter

  try {
    const user = await User.findOne({ address });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.query.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user details
export const updateUser = async (req, res) => {
  try {
    const updates = await new Promise((resolve) => {
      let rawData = "";
      req.on("data", (chunk) => (rawData += chunk));
      req.on("end", () => resolve(JSON.parse(rawData)));
    });
    const { error } = userSchemaJoi.validate(updates);
    if (error) {
      // Handle validation error
      return res.status(400).json({ success: false, error: error.message });
    }
    const user = await User.findByIdAndUpdate(req.query.userId, updates, {
      new: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Generic image upload function
export const uploadUserImage = async (req, res) => {
  const { userId } = req.query;

  try {
    const { fields, files } = await parseForm(req);
    // Find user and get current image URL
    const user = await User.findOne({ address: userId });
    if (!user) {
      cleanUpLocalFiles(files);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (files.avatar) {
      const avatarUrl = await uploadFileToS3(files.avatar[0], user.avatar);
      user.user_avatar = avatarUrl;
    }

    if (files.banner) {
      const bannerUrl = await uploadFileToS3(files.banner[0], user.banner);
      user.user_banner = bannerUrl;
    }

    await user.save();
    cleanUpLocalFiles(files);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    // cleanUpLocalFiles(files);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user's social media links
export const updateUserSocials = async (req, res) => {
  const { userId } = req.query;
  const updates = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.socials) {
      user.socials = {}; // Depending on your SocialSchema, you might need to create a new instance of it
    }

    const invalidLinks = [];
    Object.keys(updates).forEach((key) => {
      const link = updates[key].trim();
      if (link === "" || isValidSocialLink(link)) {
        // Allows for empty strings to clear the social link
        user.socials[key] = link;
      } else {
        invalidLinks.push(key);
      }
    });

    if (invalidLinks.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid URL(s) for: ${invalidLinks.join(
          ", "
        )}. URLs must start with "http://" or "https://".`,
      });
    }

    await user.save();
    res.status(200).json({ success: true, data: user.socials });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user's chat account ID
export const updateUserWithChatAccountId = async (req, res) => {
  const { id } = req.query;
  const { chat_account_id } = req.body;
  try {
    const user = await User.findById(id);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" }); // Correctly send a response
    }

    // Update the user with the chat account ID
    user.chat_account_id = chat_account_id;
    await user.save();

    console.log("Updated user with chat account ID:", user);
    return res.status(200).json({ message: "Successfully updated", user }); // Successfully updated
  } catch (error) {
    console.error("Error updating user with chat account ID:", error);
    return res
      .status(500)
      .json({ error: "Error updating user with chat account ID" }); // Error occurred
  }
};
