import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Remove Faculty
    const { id } = req.body
    await prisma.subjectiveQuestion.delete({
      where: {
        sq_id: id,
      }
    })
    await prisma.$disconnect()
    res.status(200).json({message: "Subjective Question Deleted Successfully"})
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler