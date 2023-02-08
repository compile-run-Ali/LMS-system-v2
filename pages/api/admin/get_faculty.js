import { PrismaClient } from "@prisma/client"

export default handler = async (req, res) => {
  const prisma = new PrismaClient()
  try { 
    //Find Faculty
    const faculty = await prisma.faculty.findMany({
      select: {
        faculty_id: true,
        name: true,
        email: true,
        phone_number: true,
        department: true,
        password: true,
        profile_picture: true,
        courses: {
          select: {
            course_name: true,
            course_code: true,
            credit_hours: true,
            department: true,
          },
        },
      },
    })
    res.status(200).json(faculty)
  } catch (err) {
    throw new Error(err.message)
  }
}