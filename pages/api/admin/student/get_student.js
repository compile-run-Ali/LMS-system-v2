import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    //  Find Student
    const student = await prisma.student.findMany({
      select: {
        p_number: true,
        name: true,
        email: true,
        cgpa: true,
        DOB: true,
        password: true,
        phone_number: true,
        profile_picture: true,
        courses: {
          select: {
            course_code: true,
          },
        },
      },
    });
    res.status(200).json(student);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
