import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { index } = req.query;

  try {
    // set submitted of the paper to true
    const paper_id = index;
    const paper = await prisma.studentPaperAttempt.update({
      where: {
        paper_id: paper_id,
      },
      data: {
        submitted: true,
      },
    });
    res.status(200).json(paper);
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
}
