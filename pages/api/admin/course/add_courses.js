import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //create Course
    const course = await prisma.course.create({
      data: {
        course_code: req.body.course_code,
        course_name: req.body.name,
        credit_hours: Number(req.body.credit_hours),
      },
    });
    res.status(200).json(course)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler