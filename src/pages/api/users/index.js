import {
  createUser,
  getUserById,
  getAllUsers,
  getUserByAddress,
} from "@/controllers/user";
// import multer from "multer";
const connectDB = require("../../../utils/database/database");

// Export this to tell Next.js that we'll handle body parsing ourselves
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  try {
    if (req.method === "GET") {
      // console.log("req.query", req.query);
      if (req.query.address) {
        return getUserByAddress(req, res);
      } else {
        return getAllUsers(req, res);
      }
    } else if (req.method === "POST") {
      createUser(req, res);
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
