import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    //get all courses
    const courses = await prisma.course.findMany({
      select: {
        course_code: true,
        course_name: true,
        credit_hours: true,
        max_students: true,
        faculty: {
          select: {
            faculty: {
              select: {
                faculty_id: true,
                name: true,
              },
            },
          },
        },
        students: {
          select: {
            p_number: true,
          },
        },
      },
    });
    const formattedCourse = courses.map((course) => {
      const faculty = course.faculty.map((faculty) => {
        return faculty.faculty;
      });
      return {
        ...course,
        student_count: course.students?.length,
        faculty: faculty,
      };
    });
 

    res.status(200).json(formattedCourse);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
