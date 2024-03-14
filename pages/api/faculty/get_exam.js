import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  console.log("req.body in get_exam: ", req.body)
  try {
    //get all papers
    const paper = await prisma.paper.findUnique({
      where: {
        paper_id: req.body.paper_id,
      },
      select: {
        examofficer: {
          select: {
            faculty_id: true,
            level: true,
          },
        },
        course: true,
        paper_name: true,
        paper_type: true,
        date: true,
        duration: true,
        objDuration: true,
        weightage: true,
        freeflow: true,
        status: true,
        paper_id: true,
        review: true,
        total_marks: true,
      },
    });
    console.log("paper in get_exam: ", paper)
    res.status(200).json(paper);
  } catch (err) {
    console.log(err, 'Get Paper Error')
    res.status(500).json({ err });
  }
};

export default handler;
