import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  console.log("in get_exam: ", req.query)
  try {
    //get all papers
    const papers = await prisma.paper.findMany({
      where: {course_code: req.query.course_code},
      include: {
        course: true,
        examofficer: true,
        subjective_questions: true,
        objective_questions: true,
      },
    })
    res.status(200).json(papers);
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler;