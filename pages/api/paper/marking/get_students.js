import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const students = await prisma.sRC.findMany({
      where: {
        paper_id: req.body.paper_id,
      },
      select: {
        student: {
          select: {
            name: true,
            p_number: true,
          },
        },
      },
    });
    res.status(200).json(students);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
