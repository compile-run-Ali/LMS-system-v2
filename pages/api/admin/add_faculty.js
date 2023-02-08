import { PrismaClient } from "@prisma/client"

export default handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Create Faculty
    const faculty = await prisma.faculty.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        password: req.body.password,
        level: req.body.level,
        phone_number: req.body.phone,
      },
    })
    res.status(200).json(faculty)
  } catch (err) {
    throw new Error(err.message)
  }
}