import { PrismaClient } from "@prisma/client"

export default handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Create New Subjective Question
    //Create New Objective Question
    //Update Paper enty with new questions
    res.status(200).json({message: "Subjective Objective Question has been created"})
  } catch (err) {
    throw new Error(err.message)
  }
}