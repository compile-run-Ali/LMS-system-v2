// get paper by id
import { PrismaClient } from "@prisma/client";
import { getPaperDateTime, compareDateTime } from "@/lib/TimeCalculations";

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

    if (
      compareDateTime(
        paper.date,
        getPaperDateTime(paper.date, paper.duration).end
      ) === "live"
    ) {
      res.status(200).json(paper);
    }
    else{
      res.status(401).json("Paper is not live.");
    }
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
};

export default handle;
