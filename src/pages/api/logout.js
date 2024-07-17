import { destroySession } from "@/utils/session";

export default function handler(req, res) {
  destroySession(req, res);
  res.status(200).json({ message: "Logged out" });
}
