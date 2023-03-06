import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Create New SQ and connect to paper
    const newSQ = await prisma.subjectiveQuestion.create({
      data: {
        question: req.body.question,
        marks: req.body.marks,
        long_question: req.body.long_question,
        questionnumber :req.body.questionnumber,
        paper: {
          connect: {
            paper_id: req.body.paper_id,
          },
        },
      },
    })
    if (req.body.parent_question !== "") {
      const updatedSQ = await prisma.subjectiveQuestion.update({
        where: {
          sq_id: newSQ.sq_id,
        },
        data: {
          parent_question: {
            connect: {
              sq_id: req.body.parent_question,
            },
          },
        },
        select: {
          sq_id: true,
          question: true,
          marks: true,
          long_question: true,
          parent_question: true,
          questionnumber: true,
        }
      })
      res.status(200).json(updatedSQ)
    }


    //Update Paper with new questions
    // await prisma.paper.update({
    //   where: {
    //     paper_id: req.body.paper_id,
    //   },
    //   data: {
    //     subjectiveQuestions: {
    //       connect: {
    //         sq_id: newSQ.sq_id,
    //       },
    //     },
    //   },
    // })
    res.status(200).json(newSQ)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler