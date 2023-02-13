import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
    const prisma = new PrismaClient()
    try {
        //get all papers
      const paper = await prisma.paper.findUnique({
        where: {
          paper_id: req.body.paper_id,
        },
        select: {
          objective_questions: {
            select: {
              oq_id: true,
              question: true,
              correct_answer: true,
              answers: true,
              marks: true,
            }
          },
        }
      })
        res.status(200).json(paper.objective_questions)
    } catch (err) {
        throw new Error(err.message)
    }
}

export default handler;