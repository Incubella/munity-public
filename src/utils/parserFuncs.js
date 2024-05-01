import { IncomingForm } from "formidable";
import { promises as fs } from "fs";

export async function cleanUpLocalFiles(files) {
  for (const fileArray of Object.values(files)) {
    for (const file of fileArray) {
      await fs.unlink(file.filepath);
    }
  }
}

export async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    // console.log(form);
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      // Convert fields into the correct format
      const formattedFields = {};
      for (const key in fields) {
        formattedFields[key] = fields[key][0]; // Take the first element of each array
      }

      resolve({ fields: formattedFields, files });
    });
  });
}
