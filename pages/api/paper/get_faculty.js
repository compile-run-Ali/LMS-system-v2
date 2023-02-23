import { PrismaClient } from "@prisma/client";

//get faculty with level above 1

const handler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const faculty = await prisma.faculty.findMany({
      where: {
        level: {
          gt: 1,
        },
      },
      select: {
        name: true,
        email: true,
        level: true,
        faculty_id: true,
        department: true,
      },
    });
    res.status(200).json(faculty);
  } catch (err) {
    throw new Error(err.message);
  }
}

export default handler;