import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const updatedSQ = await prisma.subjectiveQuestion.update({
      where: {
        sq_id: req.body.sq_id,
      },
      data: {
        question: req.body.question,
        marks: req.body.marks,
        long_question: req.body.long_question,
      },
    });
    res.status(200).json(updatedSQ);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
