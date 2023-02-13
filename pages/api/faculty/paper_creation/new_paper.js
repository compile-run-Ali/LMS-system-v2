import { PrismaClient } from "@prisma/client"


const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    //Create Paper and connect to course code then connect course with paperid
    const paper = await prisma.paper.create({
      data: {
        paper_name: req.body.paper_name,
        time: req.body.paper_time,
        date: req.body.date,
        duration: req.body.duration,
        weightage: req.body.weightage,
        paper_type: req.body.paper_type,
      }
    })
    //connect course with paper Id
    /*
    await prisma.course.update({
      where: {
        course_code: req.body.course_code
      },
      data: {
        paper: {
          connect: {
            paper_id: paper.paper_id
          }
        }
      }
    })
    */
    res.status(200).json(paper)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler;