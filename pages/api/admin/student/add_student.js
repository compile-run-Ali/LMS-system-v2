import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    //Create Student
    const hash = await bcrypt.hash(req.body.password, 0);
    const student = await prisma.student.create({
      data: {
        p_number: req.body.p_number,
        name: req.body.name,
        password: hash,
        phone_number: req.body.phone_number,
        cgpa: Number(req.body.cgpa),
        email: req.body.email,
        DOB: new Date(req.body.DOB),
      },
      select: {
        p_number: true,
        name: true,
        phone_number: true,
        cgpa: true,
        email: true,
        DOB: true,
      },
    });
    res.status(200).json(student);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
