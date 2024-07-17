const { verifySession } = require("@/utils/session");

const withAuth = (handler) => {
  return async (context) => {
    const { req, res } = context;
    const session = verifySession(req, res);

    if (!session) {
      return handler({ ...context, initialUser: null });
    }

    req.user = session;
    return handler({ ...context, initialUser: session });
  };
};

module.exports = withAuth;
