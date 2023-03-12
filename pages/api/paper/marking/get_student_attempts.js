import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const existingSSA = await prisma.sSA.findUnique({
      where: {
        ssa_id: req.query.p_number + req.query.sq_id,
      },
    });

    if (existingSSA) {
      res.status(200).json(existingSSA);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
