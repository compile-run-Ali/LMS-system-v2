import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    await prisma.paper.update({
      where: {
        paper_id: req.body.paper_id,
      },
      data: {
        status: req.body.examofficer === null ? "Draft" : "Pending Approval",
      },
    })

    await prisma.paperApproval.delete({
      where: {
        paper_id: req.body.paper_id,
      },
    });
    
    req.body.examofficer !== null && await prisma.paperApproval.create({
      data: {
        paper: {
          connect: {
            paper_id: req.body.paper_id,
          },
        },
        faculty: {
          connect: {
            faculty_id: req.body.examofficer,
          },
        },
        level: req.body.level,
      },
    });
    res.status(200).json({ message: "Subjective Question Deleted Successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
}

export default handler;