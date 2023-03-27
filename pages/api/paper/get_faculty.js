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
        pa_number: true,
        name: true,
        email: true,
        level: true,
        rank: true,
        faculty_id: true,
        position: true,
      },
    });
    res.status(200).json(faculty);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
