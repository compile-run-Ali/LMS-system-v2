import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { IncomingForm } from "formidable";
import mv from "mv";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });

    

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      try {
        const hash = await bcrypt.hash(fields.password, 0);
        const studentData = {
          p_number: fields.p_number,
          name: fields.name,
          password: hash,
          phone_number: fields.phone_number,
          cgpa: Number(fields.cgpa),
          email: fields.email,
          DOB: new Date(fields.DOB),
        };


        console.log("files", files.profile_picture);

        if (files.profile_picture) {
          studentData.profile_picture = files.profile_picture.originalFilename;



          // Move the uploaded file to the specified directory
          const oldPath = files.profile_picture.filepath;
          const newPath = `./public/uploads/${files.profile_picture.originalFilename}`;

          mv(oldPath, newPath, function (err) {
            if (err) {
              console.error(err);
              return reject(err);
            }

            prisma.student.create({
              data: studentData,
              select: {
                p_number: true,
                name: true,
                phone_number: true,
                cgpa: true,
                email: true,
                DOB: true,
                profile_picture: true,
              },
            }).then(resolve).catch(reject);
          });
        } else {
          prisma.student.create({
            data: studentData,
            select: {
              p_number: true,
              name: true,
              phone_number: true,
              cgpa: true,
              email: true,
              DOB: true,
            },
          }).then(resolve).catch(reject);
        }
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  });

  res.status(200).json(data);
}
