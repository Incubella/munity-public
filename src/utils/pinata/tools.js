const axios = require("axios");
const FormData = require("form-data");
import { ethers } from "ethers";

const key = process.env.NEXT_PUBLIC_PINATA_KEY || "1f102dbf502b3e507edc";
const secret =
  process.env.NEXT_PUBLIC_PINATA_SECRET ||
  "7dff796ce7c3be325609e6b02ed29386d539cb3fac333f4fe3ba649169b11f66";
const jwt_pinata =
  process.env.NEXT_PUBLIC_PINATA_JWT ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYWQzODgyYy04NjU3LTQ4ZDYtOGEwYy0yNDdkZGZmZmM3ZGMiLCJlbWFpbCI6InVmODA5MDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjFmMTAyZGJmNTAyYjNlNTA3ZWRjIiwic2NvcGVkS2V5U2VjcmV0IjoiN2RmZjc5NmNlN2MzYmUzMjU2MDllNmIwMmVkMjkzODZkNTM5Y2IzZmFjMzMzZjRmZTNiYTY0OTE2OWIxMWY2NiIsImlhdCI6MTcwNDg5MDQ2OH0.JkVLlpajJd0U3rpK2V_FxYkjERdbiS7O_f6aWwnpmVs";

export const uploadJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  // console.log("JSONBody: ",JSONBody);

  // making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      console.log(response.data);
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const uploadFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //making axios POST request to Pinata ⬇️
  let data = new FormData();
  data.append("file", file);

  console.log("image uploaded", url, data, {
    maxBodyLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: key,
      pinata_secret_api_key: secret,
    },
  });

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      console.log("image uploaded", response.data.IpfsHash);
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log("error", error.message);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const getResponseFromUri = async (uriLink) => {
  return axios
    .get(uriLink)
    .then(function (response) {
      // console.log("response.data",response.data)
      return response.data;
    })
    .catch(function (error) {
      console.log("error", error.message);
      return null;
    });
};

export const getWeiFromEther = (_ether) => {
  const wei = ethers.parseEther(String(_ether));
  return wei.toString();
};
export const getEtherFromWei = (_wei) => {
  const eth = ethers.formatEther(String(_wei));
  return eth.toString();
};

export const shortenWalletAddress = (
  fullAddress,
  startLength = 6,
  endLength = 4
) => {
  if (!fullAddress || fullAddress.length < startLength + endLength) {
    return fullAddress;
  }

  const start = fullAddress.slice(0, startLength);
  const end = fullAddress.slice(-endLength);

  return `${start}...${end}`;
};
