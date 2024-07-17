const { createSession } = require("@/utils/session");
const { authenticateUser } = require("@/utils/auth"); // Import the authenticateUser function from your utils

const loginHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { username, password } = req.body;

  // Authenticate the user (replace with your actual authentication logic)
  const user = await authenticateUser(username, password);

  if (user) {
    createSession(req, res, user);
    res.status(200).json({ token: user.token, role: user.role }); // Return token and role
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export default loginHandler;
