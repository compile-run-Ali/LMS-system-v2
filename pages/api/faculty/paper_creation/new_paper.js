import { PrismaClient } from "@prisma/client"


export default handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Create New Paper
    //Update Course Entry and connect with created Paper
    res.status(200).json({message: "Paper has been createrd"})
  } catch (err) {

  }
}