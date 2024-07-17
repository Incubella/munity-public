import {
  featureCommunity,
  getFeaturedCommunity,
} from "@/controllers/community";
import connectDB from "@/utils/database/database";

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  if (req.method === "GET") {
    return getFeaturedCommunity(req, res);
  } else if (req.method === "POST") {
    return featureCommunity(req, res);
  } else {
    res.setHeader("Allow", ["POST, GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
