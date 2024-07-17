// src/pages/api/banned-ips.js

import connectDB from "@/utils/database/database";
import BannedIP from "@/models/bannedIP";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    if (!global.isConnected) {
      await connectDB();
      global.isConnected = true; // global flag to maintain a cached connection
      // console.log("Database connected:", global.isConnected);
    }
    const bannedIPs = await BannedIP.find().select("ip -_id");
    res.status(200).json({ bannedIPs: bannedIPs.map((doc) => doc.ip) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching banned IPs" });
  }
}
