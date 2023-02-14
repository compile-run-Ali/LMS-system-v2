import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    // Edit Student Details
    const student = await prisma.student.update({
      where: {
        student_id: req.body.student_id,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        cgpa: req.body.cgpa,
        dob: req.body.dob,
      },
    });
    res.status(200).json(student);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
