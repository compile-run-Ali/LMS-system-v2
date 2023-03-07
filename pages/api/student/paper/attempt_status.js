import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    // set submitted of the paper to true
    const SPA = await prisma.sPA.create({
      data: {
        studentId: req.body.studentId,
        paperId: req.body.paperId,
        status: req.body.status,
      },
    });
    res.status(200).json(SPA);
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
}
