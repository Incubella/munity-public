import {
  getAllCommunities,
  createCommunity,
  getCommunityByUserId,
} from "@/controllers/community";
// import multer from "multer";
const connectDB = require("../../../utils/database/database");

// Export this to tell Next.js that we'll handle body parsing ourselves
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  try {
    if (req.method === "GET") {
      if (req.query.userId) {
        return getCommunityByUserId(req, res);
      } else {
        return getAllCommunities(req, res);
      }
    } else if (req.method === "POST") {
      // let newReq = await req.body;
      // console.log("newReq", newReq);
      createCommunity(req, res);
    } else {
      // Handle any other HTTP methods not supported.
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("The API encountered an error:", error);
    res.status(500).end("Internal Server Error");
  }
}
