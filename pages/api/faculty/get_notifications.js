import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const unread_notifications = await prisma.notification.findMany({
      where: {
        faculty_id: req.body.faculty_id,
        read: false,
      },
    });
    res.status(200).json(unread_notifications);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
