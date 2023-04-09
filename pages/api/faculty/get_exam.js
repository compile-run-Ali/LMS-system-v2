import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
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
        weightage: true,
        freeflow: true,
        status: true,
        paper_id: true,
        review: true,
        total_marks: true,
      },
    });
    res.status(200).json(paper);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export default handler;
