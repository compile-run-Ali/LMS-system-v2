import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  try {
    console.log("req.body.course_code in edit[", req.body.course_code.length, "]: ", req.body.course_code)
    const copyData = req.body.course_code
      ? {
          paper_name: req.body.paper_name,
          date: req.body.date,
          duration: req.body.duration,
          objDuration: req.body.objDuration,
          weightage: req.body.weightage,
          freeflow: req.body.freeflow,
          review: req.body.review,
          course_code: req.body.course_code.length > 1 ? req.body.course_code[0] : req.body.course_code,
        }
      : {
          paper_name: req.body.paper_name,
          date: req.body.date,
          duration: req.body.duration,
          objDuration: req.body.objDuration,
          weightage: req.body.weightage,
          freeflow: req.body.freeflow,
          review: req.body.review,
        };

    console.log("copyData in editPaper: ", copyData)
    const paper = await prisma.paper.update({
      where: {
        paper_id: req.body.paper_id,
      },
      data: {
        ...copyData,
      },
    });

    if (req.body.course_code.length > 1) {
      const createCoursePapers = req.body.course_code.map(async (courseCode) => {
        await prisma.coursePaper.create({
          data: {
            course_code: courseCode,
            paper_id: req.body.paper_id,
          },
        });
      });

      // Wait for all CoursePaper records to be created
      await Promise.all(createCoursePapers);
    }

    res.status(200).json(paper);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
