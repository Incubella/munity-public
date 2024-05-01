// /api/communities/[communityId]/channels/index.js
import { createChannel } from "@/controllers/channel";
import connectDB from "@/utils/database/database";

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  try {
    if (req.method === "POST") {
      return createChannel(req, res);
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("The API encountered an error:", error);
    res.status(500).end("Internal Server Error");
  }
}
