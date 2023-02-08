import { PrismaClient } from "@prisma/client"

export default handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Remove Faculty
    const { id } = req.body
    await prisma.faculty.delete({
      where: {
        faculty_id: id,
      }
    })
    await prisma.$disconnect()
    res.status(200).json({message: "Objective Question has been created"})
  } catch (err) {
    throw new Error(err.message)
  }
}