const {
  UserSchemaJoi,
  CommunitySchemaJoi,
  FolderSchemaJoi,
  RoadmapSchemaJoi,
  KeySchemaJoi,
  FileSchemaJoi,
} = require("./schemas");
const ExpressError = require("./utils/ExpressError");

const validateMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateUser = validateMiddleware(UserSchemaJoi);
module.exports.validateCommunity = validateMiddleware(CommunitySchemaJoi);
module.exports.validateFolder = validateMiddleware(FolderSchemaJoi);
module.exports.validateRoadmap = validateMiddleware(RoadmapSchemaJoi);
module.exports.validateKey = validateMiddleware(KeySchemaJoi);
module.exports.validateFileData = validateMiddleware(FileSchemaJoi);
