import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Edit Faculty Details
    const faculty = await prisma.faculty.update({
      where: {
        faculty_id: req.body.faculty_id,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        department: req.body.department,
        profile_picture: req.body.profile_picture,
        level: Number(req.body.level),
      },
    })
    res.status(200).json(faculty)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler;