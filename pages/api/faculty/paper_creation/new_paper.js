import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  console.log(req.body);
  try {
    //Create Paper and connect to course code then connect course with paperid
    const paper = await prisma.paper.create({
      data: {
        paper_name: req.body.paper_name,
        paper_type: req.body.paper_type,
        time: req.body.time,
        date: req.body.date,
        duration: req.body.duration,
        weightage: req.body.weightage,
        freeflow: req.body.freeflow,
        course: {
          connect: {
            course_code: req.body.course_code,
          },
        },
      },
    });

    res.status(200).json(paper);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
