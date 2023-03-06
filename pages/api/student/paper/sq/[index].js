// api to fetch subjective questions using paper

import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { index } = req.query;
  const paper_id = index;
  try {
    const questions = await prisma.subjectiveQuestion.findMany({
      where: {
        paper_id: paper_id,
      },
      orderBy: {
        questionnumber: "asc",
      },
    });
    if (!questions) {
      console.log("questions not found");
      return res.status(404).json("Questions not found");
    }
    res.status(200).json(questions);
  } catch {
    console.log("inside catch");
    res.status(500).json({ error: "Server Error" });
  }
}
