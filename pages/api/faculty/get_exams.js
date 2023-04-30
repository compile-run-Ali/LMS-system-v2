import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  try {
    const exams = await prisma.faculty.findUnique({
      where: {
        faculty_id: req.body.faculty_id,
      },
      select: {
        paperapproval: {
          select: {
            level: true,
            paper: {
              select: {
                paper_id: true,
                paper_name: true,
                paper_type: true,
                date: true,
                duration: true,
                weightage: true,
                freeflow: true,
                status: true,
                total_marks: true,
                course: true,
              },
            },
          },
        },
        courses: {
          select: {
            course: {
              select: {
                course_code: true,
                course_name: true,
                credit_hours: true,
                paper: {
                  select: {
                    paper_id: true,
                    paper_name: true,
                    paper_type: true,
                    date: true,
                    duration: true,
                    weightage: true,
                    freeflow: true,
                    examofficer: true,
                    status: true,
                    total_marks: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    console.log(exams);
    res.status(200).json(exams);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
