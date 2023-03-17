import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const updatedNotification = await prisma.notification.update({
      where: {
        notification_id: req.body.notification_id,
      },
      data: {
        read: true,
      },
    });
    res.status(200).json(updatedNotification);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
