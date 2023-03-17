import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  console.log(req.body)
  try {
    //Remove Student
    const { id } = req.body;
    await prisma.student.delete({
      where: {
        p_number: req.body.p_number,
      },
    });
    await prisma.$disconnect();
    res.status(200).json({ message: "Student has been Deleted" });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
