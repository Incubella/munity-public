import connectDB from "@/utils/database/database";
import Community from "@/models/community";

export default async function handler(req, res) {
  if (!global.isConnected) {
    await connectDB();
    global.isConnected = true; // global flag to maintain a cached connection
    // console.log("Database connected:", global.isConnected);
  }
  if (req.method === "GET") {
    const categories = [
      "art",
      "games",
      "music",
      "photography",
      "collectibles",
      "virtual world",
    ];

    const categoryQuantities = {};

    for (const category of categories) {
      const count = await Community.countDocuments({
        community_category: category,
      });
      categoryQuantities[category] = count;
    }
    res.status(200).json({ success: true, data: categoryQuantities });
  } else {
    res.setHeader("Allow", [" GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
