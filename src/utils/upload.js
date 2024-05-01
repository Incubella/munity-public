const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const uniqid = require("uniqid");
// const NodeClam = require("clamscan");
const fs = require("fs");
// Initialize S3 client outside of the functions to reuse the instance
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
// Helper function to delete an old image from S3
export async function deleteFileFromS3(fileKey) {
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
    // console.log(`Successfully deleted file ${fileKey} from S3`);
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw new Error("Failed to delete file from S3");
  }
}

export async function uploadFileToS3(file, existingUrl = null) {
  // const clamscan = new NodeClam();
  // await clamscan.init({
  //   removeInfected: true, // Removes files if they are infected
  //   quarantineInfected: false, // Move file to quarantine
  //   scanLog: null, // Path to a writeable log file to write scan results into
  //   debugMode: true, // Whether or not to log info/debug/error msgs to the console
  //   fileList: null, // path to file containing list of files to scan (for scanFiles method)
  //   scanRecursively: true, // If true, deep scan folders recursively
  //   clamscan: {
  //     path: "C:\\Program Files\\ClamAV\\clamscan.exe", // Path to clamscan binary on your server
  //     db: null, // Path to a custom virus definition database
  //     scanArchives: true, // If true, scan archives (ex. zip, rar, tar, dmg, iso, etc...)
  //     active: true, // If true, this module will consider using the clamscan binary
  //   },
  //   preference: "clamscan", // If clamscan is found and active, it will be used by default
  // });
  // If there is an existing URL and the filename hasn't changed, use the existing URL
  const fileNameInUrl = existingUrl ? existingUrl.split("/").pop() : null;
  if (existingUrl && file) {
    const fileKey = existingUrl.split("/").pop();

    await deleteFileFromS3(fileKey);
  }
  if (fileNameInUrl === file.newFilename) {
    return existingUrl; // No need to upload the file again if it has the same name
  }
  // Read the file content
  const fileContent = await fs.promises.readFile(file.filepath);

  // console.log("filecontent", fileContent);
  // Scan the buffer with clamscan
  // const { isInfected, viruses } = clamscan.isInfected(file.filepath);
  // // console.log("heloooooooo", isInfected, viruses);

  // if (isInfected) {
  //   console.error(`The file is infected with ${viruses}`);
  //   // Handle the infected file (delete it, log it, etc.)
  //   throw new Error(`The file is infected with ${viruses}`);
  // }
  // const s3Client = new S3Client({
  //   region: process.env.AWS_REGION,
  //   credentials: {
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   },
  // });
  const ext = file.newFilename.split(".").slice(-1)[0];
  const newFileName = uniqid() + "." + ext;
  // const chunks = [];
  // for await (const chunk of file.stream()) {
  //   chunks.push(chunk);
  // }
  // const buffer = Buffer.concat(chunks);
  // const fileContent = await fs.promises.readFile(file.filepath);
  const params = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: newFileName,
    ACL: "public-read",
    ContentType: file.mimetype,
    Body: fileContent,
  });

  await s3Client.send(params);
  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${newFileName}`;
}

// Example function to call a virus scanning service API
// async function scanFileForViruses(filePath) {
//   // Implement the actual call to the virus scanning service
//   // This is just a placeholder function
//   const response = await fetch("https://example-virus-scan-service.com/scan", {
//     method: "POST",
//     body: fs.createReadStream(filePath),
//     // Additional headers or parameters as required by the virus scanning service
//   });

//   const result = await response.json();

//   if (result.isInfected) {
//     throw new Error("File is infected");
//   }
// }
