// api to get answer of student if exists

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const existingSOA = await prisma.sOA.findUnique({
      where: {
        soa_id: req.query.p_number + req.query.oq_id,
      },
    });

    if (existingSOA) {
      res.status(200).json(existingSOA);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.log(err);
  }
}
