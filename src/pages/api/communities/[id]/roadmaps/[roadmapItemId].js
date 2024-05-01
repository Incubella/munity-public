// src/api/communities/[communityId]/roadmaps/[roadmapItemId].js
import { deleteRoadmap } from "@/controllers/roadmap";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    // Delete a specific roadmap item from the community
    return deleteRoadmap(req, res);
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
