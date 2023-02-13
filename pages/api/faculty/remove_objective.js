import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Remove Faculty
    const { id } = req.body
    await prisma.objectiveQuestion.delete({
      where: {
        oq_id: id,
      }
    })
    await prisma.$disconnect()
    res.status(200).json({message: "Objective Question Deleted Successfully"})
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler