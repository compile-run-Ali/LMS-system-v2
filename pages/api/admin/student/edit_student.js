import { PrismaClient } from "@prisma/client";
import { IncomingForm } from "formidable";
import mv from "mv";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      console.log(fields.p_number);
      if (err) {
        console.error(err);
        return reject(err);
      }
      try {
        const studentData = {
          name: fields.name,
          email: fields.email,
          phone_number: fields.phone_number,
          cgpa: Number(fields.cgpa),
          DOB: new Date(fields.DOB),
        };

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

            prisma.student
              .update({
                where: {
                  p_number: fields.p_number,
                },
                data: studentData,
                select: {
                  p_number: true,
                  name: true,
                  email: true,
                  phone_number: true,
                  cgpa: true,
                  DOB: true,
                  rank: true,
                  profile_picture: true,
                },
              })
              .then(resolve)
              .catch(reject);
          });
        } else {
          prisma.student
            .update({
              where: {
                p_number: fields.p_number,
              },
              data: studentData,
              select: {
                p_number: true,
                name: true,
                email: true,
                phone_number: true,
                rank: true,
                cgpa: true,
                DOB: true,
              },
            })
            .then(resolve)
            .catch(reject);
        }
      } catch (err) {
        console.error(err);
        return reject(err);
      }
    });
  });
  res.status(200).json(data);
  // const prisma = new PrismaClient();
  // try {
  //   // Edit Student Details
  //   const student = await prisma.student.update({
  //     where: {
  //       p_number: req.body.p_number,
  //     },
  //     data: {
  //       name: req.body.name,
  //       email: req.body.email,
  //       phone_number: req.body.phone_number,
  //       cgpa: req.body.cgpa,
  //       dob: req.body.dob,
  //     },
  //   });
  //   res.status(200).json(student);
  // } catch (err) {
  //   throw new Error(err.message);
  // }
};

export default handler;
