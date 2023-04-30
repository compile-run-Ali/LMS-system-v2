import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  try {
    const students = await prisma.paper.findFirst({
      where: {
        paper_id: req.body.paper_id,
      },
      select: {
        course: {
          select: {
            students: {
              select: {
                student: {
                  select: {
                    p_number: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(200).json(students);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
