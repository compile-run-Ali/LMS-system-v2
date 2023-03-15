import { PrismaClient } from "@prisma/client"
import {IncomingForm} from "formidable"
import mv from "mv"

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm({multiples: true})
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      try {
        const facultyData = {
          name: fields.name,
          email: fields.email,
          department: fields.department,
          phone_number: fields.phone_number,
          level: Number(fields.level),
        }

        if (files.profile_picture) {
          facultyData.profile_picture = files.profile_picture.originalFilename

          // Move the uploaded file to the specified directory
          const oldPath = files.profile_picture.filepath
          const newPath = `./public/uploads/${files.profile_picture.originalFilename}`

          mv(oldPath, newPath, function (err) {
            if (err) {
              console.error(err)
              return reject(err)
            }

            prisma.faculty.update({
              where: {
                faculty_id: fields.faculty_id,
              },
              data: facultyData,
              select: {
                faculty_id: true,
                name: true,
                email: true,
                phone_number: true,
                department: true,
                level: true,
                profile_picture: true,
              },
              
            }).then(resolve).catch(reject)
          })
        }
        else {
          prisma.faculty.update({
            where: {
              faculty_id: fields.faculty_id,
            },
            data: facultyData,
            select: {
              faculty_id: true,
              name: true,
              email: true,
              phone_number: true,
              department: true,
              level: true,
            },
          }).then(resolve).catch(reject)
        }
      } catch (err) {
        console.error(err)
        return reject(err)
      }
    })
  })
  res.status(200).json(data)

  // const prisma = new PrismaClient()
  // try {
  //   //Edit Faculty Details
  //   const faculty = await prisma.faculty.update({
  //     where: {
  //       faculty_id: req.body.faculty_id,
  //     },
  //     data: {
  //       name: req.body.name,
  //       email: req.body.email,
  //       phone_number: req.body.phone_number,
  //       department: req.body.department,
  //       profile_picture: req.body.profile_picture,
  //       level: Number(req.body.level),
  //     },
  //   })
  //   res.status(200).json(faculty)
  // } catch (err) {
  //   throw new Error(err.message)
  // }
}

export default handler;