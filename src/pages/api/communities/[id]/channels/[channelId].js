// /api/communities/[communityId]/channels/[channelId].js
import { deleteChannel } from "@/controllers/channel";
import connectDB from "@/utils/database/database";
export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // Use global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  try {
    if (req.method === "DELETE") {
      return deleteChannel(req, res);
    } else {
      res.setHeader("Allow", ["DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("The API encountered an error:", error);
    res.status(500).end("Internal Server Error");
  }
}
