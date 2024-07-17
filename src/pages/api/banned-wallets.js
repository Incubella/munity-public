// pages/api/banned-wallets.js
import connectDB from "@/utils/database/database";
import BannedWallet from "@/models/bannedWallet";

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  if (req.method === "GET") {
    try {
      const bannedWallets = await BannedWallet.find(
        {},
        { walletId: 1, _id: 0 }
      );
      res.status(200).json({
        bannedWallets: bannedWallets.map((wallet) => wallet.walletId),
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching banned wallets" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
