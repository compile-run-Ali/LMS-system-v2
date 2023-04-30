import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  console.log(req.body);
  try {
    //Create Paper and connect to course code then connect course with paperid
    const paper = await prisma.paper.create({
      data: {
        paper_name: req.body.paper_name,
        paper_type: req.body.paper_type,
        date: req.body.date,
        duration: req.body.duration,
        weightage: req.body.weightage,
        freeflow: req.body.freeflow,
        review: req.body.review,
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