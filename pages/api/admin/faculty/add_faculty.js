import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Create Faculty
    const hash = await bcrypt.hash(req.body.password, 0)
    const faculty = await prisma.faculty.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        password: hash,
        level: req.body.level,
        phone_number: req.body.phone_number,
      },
    })
    res.status(200).json(faculty)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler