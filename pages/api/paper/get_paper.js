// get a paper by id

import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const paper = await prisma.paper.findMany({
      where: {
        paper_id: req.query.paper_id,
      },
      select: {
        course_code: true,
        paper_id: true,
        paper_name: true,
        paper_type: true,
        duration: true,
        status: true,
        objective_questions: {
          select: {
            oq_id: true,
            question: true,
            answers: true,
            correct_answer: true,
            marks: true,
            timeAllowed: true,
          },
        },
        subjective_questions: {
          select: {
            sq_id: true,
            question: true,
            marks: true,
            questionnumber: true,
            long_question: true,
            parent_sq_id: true,
          },
        },
      },
    });
    res.status(200).json(paper);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
