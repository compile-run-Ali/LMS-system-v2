import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handle = async (req, res) => {
  let p_number = Number(req.query.index);

  try {
    const student = await prisma.student.findUnique({
      where: {
        p_number: p_number,
      },
    });

    if (!student) return res.status(404).json("Student not found");
    res.status(200).json(student);
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
};

export default handle;
