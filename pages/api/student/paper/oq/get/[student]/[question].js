// find answer of the student of a question
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {

  console.log("inside get answer", req.query);
  try {
    const existingSOA = await prisma.sOA.findUnique({
      where: {
        soa_id: req.query.student + req.query.question,
      },
    });

    if (existingSOA) {
      res.status(200).json(existingSOA);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
