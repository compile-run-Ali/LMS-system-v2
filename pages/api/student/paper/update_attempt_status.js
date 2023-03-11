import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    const { studentId, paperId, status, marks } = req.body;

    // find an existing record with the provided id
    let existingSPA = await prisma.sPA.findUnique({
      where: { spaId: studentId + paperId },
    });

    // if the record does not exist, create a new one
    if (!existingSPA) {
      existingSPA = await prisma.sPA.create({
        data: {
          spaId: studentId + paperId,
          studentId: studentId,
          paperId: paperId,
        },
      });
    }

    // update the status and marks of the paper if both are present
    const updatedSPA = await prisma.sPA.update({
      where: { spaId: studentId + paperId },
      data: {
        status: status,
        obtainedMarks: marks !== undefined ? marks : 0,
      },
    });

    res.status(200).json(updatedSPA);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}
