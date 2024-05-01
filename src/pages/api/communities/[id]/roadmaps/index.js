// src/api/communities/[communityId]/roadmaps/index.js
import { addOrUpdateRoadmap, updateRoadmapType } from "@/controllers/roadmap";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Add or update a roadmap within the community
    return addOrUpdateRoadmap(req, res);
  } else if (req.method === "PATCH") {
    // Update roadmap type (Monthly/Quarterly) within the community
    return updateRoadmapType(req, res);
  } else {
    res.setHeader("Allow", ["POST", "PATCH"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
