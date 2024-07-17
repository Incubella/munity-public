import { updateUserWithChatAccountId } from "@/controllers/user";
const connectDB = require("../../../../utils/database/database");

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // Use global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  if (req.method === "PATCH") {
    return updateUserWithChatAccountId(req, res);
  } else {
    // Handle any other HTTP methods not supported.
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
