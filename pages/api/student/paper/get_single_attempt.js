// api that fetches student paper attempt aka SPA where student and paper id match

import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  console.log("req.query ", req.query);
  const { studentId, paperId } = req.query;
  try {
    const spa = await prisma.sPA.findFirst({
      where: {
        studentId,
        paperId,
      },
    });

    if (!spa) {
      return res.status(404).json({ message: "SPA not found" });
    }

    return res.json(spa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
