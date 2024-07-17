// src/pages/api/ban/wallet.js

import connectDB from "@/utils/database/database";
import BannedWallet from "@/models/bannedWallet"; // Create a BannedWallet model

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  if (req.method === "POST") {
    const { walletIds } = req.body;

    try {
      await BannedWallet.insertMany(
        walletIds.map((wallet) => ({ walletId: wallet }))
      );
      res
        .status(200)
        .json({ success: true, message: "Wallet IDs banned successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
