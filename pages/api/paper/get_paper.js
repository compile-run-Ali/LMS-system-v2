// get a paper by id

import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const paper = await prisma.paper.findMany({
      where: {
        paper_id: req.query.paper_id,
      },
    });
    res.status(200).json(paper);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
