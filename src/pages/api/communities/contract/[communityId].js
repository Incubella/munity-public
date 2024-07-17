import { getCommunityByContractId } from "@/controllers/community";
const connectDB = require("../../../../utils/database/database");

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // Use global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  if (req.method === "GET") {
    // console.log("hi inside get", req.query.id);
    return getCommunityByContractId(req, res);
  } else {
    // Handle any other HTTP methods not supported.
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
