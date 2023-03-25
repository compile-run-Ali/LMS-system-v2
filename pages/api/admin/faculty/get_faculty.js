import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try { 
    //Find Faculty
    const faculty = await prisma.faculty.findMany({
      select: {
        faculty_id: true,
        name: true,
        email: true,
        phone_number: true,
        profile_picture: true,
        level: true,
        position: true,
      },
    })
    res.status(200).json(faculty)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler