// src/pages/api/ban/ip.js

import connectDB from "@/utils/database/database";
import BannedIP from "@/models/bannedIP"; // Create a BannedIP model

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  if (req.method === "POST") {
    const { ipAddresses } = req.body;

    try {
      await BannedIP.insertMany(ipAddresses.map((ip) => ({ ip })));
      res
        .status(200)
        .json({ success: true, message: "IP addresses banned successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
