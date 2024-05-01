export const formatDate = (dateString) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, "0");
  return `${month} ${day}`;
};

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
console.log("process.env.AWS_REGION222:", process.env.NEXT_PUBLIC_AWS_REGION);

export async function uploadAvatarToChatEngine(s3Url, chatEngineUser) {
  // Initialize S3 client outside of the functions to reuse the instance
  const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const match = s3Url.match(/https:\/\/([^\/]+)\.s3\.amazonaws\.com\/(.+)/);
  if (!match) throw new Error("Invalid S3 URL");

  const Bucket = process.env.AWS_BUCKET_NAME;
  const Key = s3Url.split("/").pop();

  // Download the file from S3
  const s3Object = await s3Client.send(new GetObjectCommand({ Bucket, Key }));

  // Since GetObjectCommand doesn't return a body property directly, we need to handle the stream
  const streamToString = (stream) =>
    new Promise((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });

  const fileContent = await streamToString(s3Object.Body);

  const form = new FormData();
  form.append("avatar", fileContent, {
    filename: Key.split("/").pop(),
    contentType: s3Object.ContentType,
  });

  form.append("username", chatEngineUser.username);
  form.append("secret", chatEngineUser.secret);

  const response = await fetch("https://api.chatengine.io/users/", {
    method: "POST",
    headers: {
      "PRIVATE-KEY": process.env.NEXT_PUBLIC_CHAT_ENGINE_PRIVATE_KEY,
    },
    body: form,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload avatar to ChatEngine: ${errorText}`);
  }

  return await response.json();
}
