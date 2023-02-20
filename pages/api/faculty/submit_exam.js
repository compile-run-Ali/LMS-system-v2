import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //create paper approval 
    const paperApproval = await prisma.paperApproval.create({
      data: {
        paper: {
          connect: {
            paper_id: req.body.paper_id
          }
        },
        faculty: {
          connect: {
            faculty_id: req.body.faculty_id
          }
        },
        level: req.body.level,
      }
    })
    res.status(200).json({message: "Exam has been submitted for approval"})
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler