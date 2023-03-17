import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const updatedOQ = await prisma.objectiveQuestion.update({
      where: {
        oq_id: req.body.oq_id,
      },
      data: {
        question: req.body.question,
        correct_answer: req.body.correct_answer,
        answers: req.body.answers,
        marks: req.body.marks,
      },
    });
    res.status(200).json(updatedOQ);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
