// get paper by id
import { PrismaClient } from "@prisma/client";

const handle = async (req, res) => {
  const prisma = new PrismaClient();
  const { index } = req.query;
  let id = index;
  try {
    const paper = await prisma.paper.findUnique({
      where: {
        paper_id: String(id),
      },
    });
    if (!paper) return res.status(404).json("Paper not found");
    res.status(200).json(paper);
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
};

export default handle;
