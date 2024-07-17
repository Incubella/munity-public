// src/pages/api/users/delete.js

import connectDB from "@/utils/database/database";
import User from "@/models/user";
import Community from "@/models/community";
export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  if (req.method === "POST") {
    const { userIds } = req.body;
    try {
      // Find all communities created by the users to be deleted
      const communities = await Community.find({ user_id: { $in: userIds } });

      // Extract community IDs
      const communityIds = communities.map((community) => community._id);

      // Delete the communities
      await Community.deleteMany({ _id: { $in: communityIds } });

      await User.deleteMany({ _id: { $in: userIds } });
      res
        .status(200)
        .json({ success: true, message: "Users deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
