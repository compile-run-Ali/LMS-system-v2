import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    //Remove Student
    const { id } = req.body;
    await prisma.student.delete({
      where: {
        p_number: id,
      },
    });
    await prisma.$disconnect();
    res.status(200).json({ message: "Student has been Deleted" });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
