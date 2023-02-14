import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    //Create Student
    const hash = await bcrypt.hash(req.body.password, 0);
    const student = await prisma.student.create({
      data: {
        name: req.body.name,
        password: hash,
        phone_number: req.body.phone_number,
        cgpa: req.body.cgpa,
        email: req.body.email,
        dob: req.body.dob,
      },
      select: {
        student_id: true,
        name: true,
        phone_number: true,
        cgpa: true,
        email: true,
        dob: true,
      },
    });
    res.status(200).json(student);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;