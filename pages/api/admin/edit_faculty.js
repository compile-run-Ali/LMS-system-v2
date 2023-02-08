import { PrismaClient } from "@prisma/client"

export default handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Edit Faculty Details
    const [id, ...updatedData] = req.body
    const faculty = await prisma.faculty.update({
      where: {
        faculty_id: id,
      },
      data: {
        ...updatedData
      },
    })
    res.status(200).json({ message: "Faculty has been updated" })
  } catch (err) {
    throw new Error(err.message)
  }
}