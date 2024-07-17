// /api/communities/[communityId]/files/[fileId].js
import { deleteFile } from "@/controllers/file";
// Export this to tell Next.js that we'll handle body parsing ourselves
import connectDB from "@/utils/database/database";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // Use global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  try {
    if (req.method === "DELETE") {
      return deleteFile(req, res);
    } else {
      res.setHeader("Allow", ["DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("The API encountered an error:", error);
    res.status(500).end("Internal Server Error");
  }
}
