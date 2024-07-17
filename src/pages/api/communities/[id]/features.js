import { updateFeature } from "@/controllers/community";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    return updateFeature(req, res);
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
