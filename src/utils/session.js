const jwt = require("jsonwebtoken");
const Cookies = require("cookies");

const SESSION_NAME = "token";
const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

const createSession = (req, res, user) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  const isProduction = process.env.NODE_ENV === "production";
  const cookies = new Cookies(req, res, { secure: isProduction });
  const secureCookie =
    isProduction && req.headers["x-forwarded-proto"] === "https";

  cookies.set(SESSION_NAME, token, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: "strict",
    maxAge: MAX_AGE,
    domain: isProduction ? ".munity.ai" : undefined,
  });

  cookies.set("role", user.role, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: "strict",
    maxAge: MAX_AGE,
    domain: isProduction ? ".munity.ai" : undefined,
  });
};

const verifySession = (req, res) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get(SESSION_NAME);

  if (!token) {
    return null;
  }
  console.log("hiiiiiiiiii");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    console.log("token", token);
    console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

const destroySession = (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set(SESSION_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
  });

  cookies.set("role", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
  });
};

module.exports = { createSession, verifySession, destroySession };
