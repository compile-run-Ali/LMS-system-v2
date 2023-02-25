import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        paper: {
          paper_id: req.body.paper_id,
        },
      },
      select: {
        faculty: {
          select: {
            name: true,
          },
        },
        message: true,
      },
    });
    res.status(200).json(notifications);
  } catch (err) {
    throw new Error(err.message);
  }
};
