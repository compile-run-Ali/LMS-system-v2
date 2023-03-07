import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Create New Objective Question
    const newObjective = await prisma.objectiveQuestion.create({
      data: {
        question: req.body.question,
        answers: req.body.answers,
        marks: req.body.marks,
        correct_answer: req.body.correct_answer,
        timeAllowed: req.body.time_allowed,
        paper: {
          connect: {
            paper_id: req.body.paper_id
          },
        },
      },
    })
    //Update Paper enty with new questions
    // await prisma.paper.update({
    //   where: {
    //     paper_id: req.body.paper_id,
    //   },
    //   data: {
    //     objective_questions: {
    //       connect: {
    //         oq_id: newObjective.oq_id,
    //       },
    //     },
    //   },
    // })
    res.status(200).json(newObjective)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler