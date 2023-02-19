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
          subjective_questions: {
            select: {
              sq_id: true,
              question: true,
              marks: true,
              long_question: true,
              parent_question: true,
            }
          },
        }
      })
        res.status(200).json(paper.subjective_questions)
    } catch (err) {
        throw new Error(err.message)
    }
}

export default handler;