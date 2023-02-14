import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    //  Find Student
    const student = await prisma.student.findMany({
      select: {
        student_id: true,
        name: true,
        email: true,
        phone_number: true,
        cgpa: true,
        dob: true,
      },
    });
    res.status(200).json(student);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
