import { PrismaClient } from "@prisma/client"

export default handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Create New SQ and connect to paper
    const newSQ = await prisma.subjectiveQuestion.create({
      data: {
        question: req.body.question,
        marks: req.body.marks,
        long_question: req.body.long_question,
        parent_question: req.body.parent_question ? {
          connect: {
            sq_id: req.body.parent_question,
          },
        } : null,
        paper: {
          connect: {
            paper_id: req.body.paper_id,
          },
        },
      },
    })
    //Update Paper with new questions
    await prisma.paper.update({
      where: {
        paper_id: req.body.paper_id,
      },
      data: {
        subjectiveQuestions: {
          connect: {
            sq_id: newSQ.sq_id,
          },
        },
      },
    })
    res.status(200).json({message: "Subjective Objective Question has been created"})
  } catch (err) {
    throw new Error(err.message)
  }
}