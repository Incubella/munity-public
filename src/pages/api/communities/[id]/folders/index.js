// /api/communities/[communityId]/folders/index.js
import { createFolder } from "@/controllers/folder";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return createFolder(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
