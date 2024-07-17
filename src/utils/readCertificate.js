// utils/readCertificate.js
const fs = require("fs");
const path = require("path");

const readCertificate = () => {
  const certPath = path.join(
    process.cwd(),
    "path",
    "to",
    "public",
    "global-bundle.pem"
  );
  return fs.readFileSync(certPath);
};

module.exports = readCertificate;
