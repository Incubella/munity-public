const {
  getAllAdminUsers,
  addAdminUser,
  deleteAdminUser,
} = require("@/controllers/adminUser");
const connectDB = require("../../../utils/database/database");

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true;
  }
  try {
    switch (req.method) {
      case "GET":
        await getAllAdminUsers(req, res);
        break;
      case "POST":
        await addAdminUser(req, res);
        break;
      case "DELETE":
        await deleteAdminUser(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
