import { PrismaClient } from "@prisma/client"

export default handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //create Course
    const course = await prisma.course.create({
      data: {
        course_code: req.body.courseCode,
        course_name: req.body.courseName,
        credit_hours: req.body.creditHours,
        department: req.body.department,
      },
    });
    //create FTC and connect with course code and faculty and update course with created FTC
    await prisma.fTC.create({
      data: {
        course: {
          connect: {
            course_code: course.course_code,
          },
        },
        faculty: {
          connect: {
            faculty_id: req.body.facultyId,
          },
        },
      },
    });
    res.status(200).json({message: "Objective Question has been created"})
  } catch (err) {
    throw new Error(err.message)
  }
}