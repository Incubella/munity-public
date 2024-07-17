// src/pages/api/communities/delete.js

import connectDB from "@/utils/database/database";
import Community from "@/models/community";

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  if (req.method === "POST") {
    const { communityIds } = req.body;

    try {
      await Community.deleteMany({ _id: { $in: communityIds } });
      res
        .status(200)
        .json({ success: true, message: "Communities deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
