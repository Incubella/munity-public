import {
  getCommunityById,
  updateCommunity,
  updateFeature,
  deleteCommunity,
} from "@/controllers/community";
const connectDB = require("../../../../utils/database/database");
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
  if (req.method === "GET") {
    // console.log("hi inside get", req.query.id);
    return getCommunityById(req, res);
  } else if (req.method === "PUT") {
    // console.log("hi inside PUT", req.query.id);
    return updateCommunity(req, res);
  } else if (req.method === "PATCH") {
    // You could use PATCH method to signify a partial update
    return updateFeature(req, res);
  } else if (req.method === "DELETE") {
    return deleteCommunity(req, res);
  } else {
    // Handle any other HTTP methods not supported.
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
