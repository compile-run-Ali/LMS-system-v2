import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const attempts = await prisma.sSA.findMany({
      where: {
        p_number: req.body.p_number,
      },
      select: {
        subjective_question: {
          select: {
            question: true,
            long_question: true,
            parent_sq_id: true,
            sq_id: true,
            paper_id: true,
            marks: true,
            questionnumber: true,
          },
        },
        answer: true,
        marksobtained: true,
        ssa_id: true,
      },
    });

    let paper_attempts = [];

    if (attempts.length > 0) {
      paper_attempts = attempts.filter((attempt) => {
        return attempt.subjective_question.paper_id === req.body.paper_id;
      });
    }
    res.status(200).json(paper_attempts);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
