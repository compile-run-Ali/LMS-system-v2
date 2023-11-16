import prisma from "@/lib/prisma";
import { IncomingForm } from "formidable";
import mv from "mv";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to parse form data" });
    }

    try {
      const { paperId, studentId } = fields;
      // if no file is uploaded, return error
      if (!files.files) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const file = files.files;
      const oldPath = file.filepath;
      const originalEnd = file.originalFilename.split(".");
      console.log(originalEnd,"originalEnd")
      const fileName = `${studentId}-${paperId}-${file.originalFilename}`;
      const newPath = `./public/attempts/${fileName.replace(/,/g, "")}`; // Remove commas from the path
      mv(oldPath, newPath, function (err) {
        if (err) {
          console.log(err);
        }
      });

      const newSIA = await prisma.sIA.create({
        data: {
          fileName: fileName,
          fileUrl: newPath,
          paperId: paperId,
          studentId: studentId,
        },
      });

      res.status(200).json(newSIA);
    } catch (e) {
      console.log("error");
      console.log(e);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });
}
