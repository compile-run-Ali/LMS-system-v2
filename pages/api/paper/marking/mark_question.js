import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const updatedExam = await prisma.sSA.update({
      where: {
        ssa_id: req.body.ssa_id,
      },
      data: {
        marksobtained: req.body.marksobtained,
      },
    });
    res.status(200).json(updatedExam);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
