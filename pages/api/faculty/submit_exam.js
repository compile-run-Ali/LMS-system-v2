import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //update paper submited field to true
    await prisma.paper.update({
      where: {
        paper_id: req.body.paper_id,
      },
      data: {
        submitted: true,
      }
    })
    res.status(200).json({message: "Exam has been submitted for approval"})
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler