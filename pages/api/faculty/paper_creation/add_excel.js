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
      const { paperId } = fields;

      const file = files.files;
      const oldPath = file.filepath;
      const fileName = file.originalFilename;
      const newPath = `./public/excels/${fileName}`;
      mv(oldPath, newPath, function (err) {
        if (err) {
          console.log(err);
        }
      });

      const newIE = await prisma.ieQuestion.create({
        data: {
          fileName: fileName,
          fileUrl: newPath,
          paper: {
            connect: {
              paper_id: paperId,
            },
          },
        },
      });

      res.status(200).json(newIE);
    } catch (e) {
      console.log("error");
      console.log(e);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });
}
