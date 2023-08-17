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
      const { paperId, total_marks } = fields;
      const float_marks = parseFloat(total_marks);
      const file = files.files;
      const oldPath = file.filepath;
      const fileName = file.originalFilename.replace(/,/g, ""); // Remove commas from the filename
      const newPath = `./public/excels/${fileName.replace(/,/g, "")}`; // Remove commas from the path
      mv(oldPath, newPath, function (err) {
        if (err) {
          console.log(err);
        }
      });
      console.log(fileName, newPath, float_marks, paperId)
      const newIE = await prisma.ieQuestion.create({
        data: {
          fileName: fileName,
          fileUrl: newPath,
          total_marks: float_marks,
          paper: {
            connect: {
              paper_id: paperId,
            },
          },
        },
      });

      // We will also have to update marks in the paper table
      const paper = await prisma.paper.findUnique({
        where: {
          paper_id: paperId,
        },
      });
      const newMarks = paper.total_marks + float_marks;
      const updatedPaper = await prisma.paper.update({
        where: {
          paper_id: paperId,
        },
        data: {
          total_marks: newMarks,
        },
      });
      console.log(updatedPaper);

      res.status(200).json(newIE);
    } catch (e) {
      console.log("error");
      console.log(e);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });
}
