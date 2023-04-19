import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    console.log("FINDING PAPER", req.body);
    const { id } = req.body;
    const originalPaper = await prisma.paper.findUnique({
      where: { paper_id: id },
    });
    if (!originalPaper) {
      return res.status(404).json({ message: "Paper not found" });
    }
    const { paper_id, examofficer, PaperComment, attempts, ...newPaper } =
      originalPaper;
    const createdPaper = await prisma.paper.create({
      data: {
        ...newPaper,
        paper_name: `${newPaper.paper_name} (copy)`,
        status: "Draft",
      },
    });
    return res.status(200).json(createdPaper);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
