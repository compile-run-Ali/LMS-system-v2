import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  console.log(req.body);
  try {
    const paper = await prisma.paper.update({
      where: {
        paper_id: req.body.paper_id,
      },
      data: {
        status: req.body.status,
      },
    });

    res.status(200).json(paper);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
