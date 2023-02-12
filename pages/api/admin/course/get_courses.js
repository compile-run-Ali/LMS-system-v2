import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //get all courses
    const courses = await prisma.course.findMany();
    res.status(200).json(courses)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler