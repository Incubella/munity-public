import { getUserById, updateUser, uploadUserImage } from "@/controllers/user";
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
    return getUserById(req, res);
  } else if (req.method === "PUT") {
    // console.log("hi inside PUT", req.query.id);
    return updateUser(req, res);
  } else if (req.method === "PATCH") {
    // You could use PATCH method to signify a partial update
    return uploadUserImage(req, res);
  } else if (req.method === "DELETE") {
    return "You can't delete an user!!!";
  } else {
    // Handle any other HTTP methods not supported.
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
