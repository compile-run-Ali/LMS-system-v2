import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Create FTC and connect with course code and faculty Id
    const ftc = await prisma.fTC.create({
      data: {
        course: {
          connect: {
            course_code: req.body.course_code,
          },
        },
        faculty: {
          connect: {
            faculty_id: req.body.faculty_id,
          },
        },
      },
      select: {
        course: {
          select: {
            course_code: true,
          },
        },
        faculty: {
          select: {
            faculty_id: true,
            name: true,
            department: true,
          },
      }
      }
    }
    )
    res.status(200).json(ftc)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler;