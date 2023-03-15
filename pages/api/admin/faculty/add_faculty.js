import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import {IncomingForm} from "formidable"
import mv from "mv"

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm({multiples: true})
    

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      try {
        const hash = await bcrypt.hash(fields.password, 0)
        const facultyData = {
          name: fields.name,
          email: fields.email,
          department: fields.department,
          password: hash,
          level: Number(fields.level),
          phone_number: fields.phone_number,
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
          
            prisma.faculty.create({
              data: facultyData,
              select: {
                faculty_id: true,
                name: true,
                email: true,
                department: true,
                level: true,
                phone_number: true,
                profile_picture: true,
              },
            }).then(resolve).catch(reject)
          })
        } else {
          prisma.faculty.create({
            data: facultyData,
            select: {
              faculty_id: true,
              name: true,
              email: true,
              department: true,
              level: true,
              phone_number: true,
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

}

export default handler