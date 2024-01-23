import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  try {
    const paperId = req.body.paper_id;
    const courseCode = req.body.course_code; // Assuming you get the course code from the request body
    
    const students = await prisma.sRC.findMany({
      where: {
        course_code: {
          in: courseCode,
        },
      },
      select: {
        student: {
          select: {
            p_number: true,
            name: true,
            eval_code: true,
          },
        },
      },
    });

    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
