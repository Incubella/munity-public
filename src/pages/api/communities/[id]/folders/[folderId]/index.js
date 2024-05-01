// /api/communities/[communityId]/folders/[folderId]/index.js
import { deleteFolder, updateFolderName } from "@/controllers/folder";

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return deleteFolder(req, res);
    case "PATCH":
      return updateFolderName(req, res);
    default:
      res.setHeader("Allow", ["DELETE", "PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
