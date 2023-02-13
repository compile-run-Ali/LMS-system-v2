import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Edit Faculty Details
    const faculty = await prisma.course.update({
      where: {
        course_code: req.body.course_code,
      },
      data: {
        course_name: req.body.course_name,
        credit_hours: Number(req.body.credit_hours),
        course_code: req.body.course_code,
        department: req.body.department,
      },
    })
    res.status(200).json(faculty)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler;