import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    //get all papers
    const paper = await prisma.paper.findUnique({
      where: {
        paper_id: req.query.paperId,
      },
      select: {
        ie_questions: {
          select: {
            fileName: true,
            ie_id: true,
            fileUrl: true,
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
