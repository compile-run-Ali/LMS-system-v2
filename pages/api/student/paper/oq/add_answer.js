import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const existingSOA = await prisma.sOA.findUnique({
      where: {
        soa_id: req.body.p_number + req.body.oq_id,
      },
    });

    if (existingSOA) {
      const updatedSOA = await prisma.sOA.update({
        where: {
          soa_id: existingSOA.soa_id,
        },
        data: {
          answer: req.body.answer,
        },
      });

      res.status(200).json(updatedSOA);
    } else {
      const newSOA = await prisma.sOA.create({
        data: {
          soa_id: req.body.p_number + req.body.oq_id,
          p_number: req.body.p_number,
          oq_id: req.body.oq_id,
          answer: req.body.answer,
        },
      });

      res.status(200).json(newSOA);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
