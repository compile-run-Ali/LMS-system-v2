import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    //Remove Faculty
    await prisma.subjectiveQuestion.delete({
      where: {
        sq_id: req.body.sq_id,
      },
    });
    await prisma.$disconnect();
    res
      .status(200)
      .json({ message: "Subjective Question Deleted Successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
