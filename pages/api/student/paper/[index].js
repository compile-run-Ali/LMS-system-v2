// api to fetch papers of student using course in which he is enrolled

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { index } = req.query;
  const p_number = index;
  try {
    const course = await prisma.sRC.findMany({
      where: {
        p_number: p_number,
      },
    });
    if (!course) {
      return res.status(404).json("Course not found");
    }

    const course_code = course[0].course_code;
    const papers = await prisma.paper.findMany({
      where: {
        course_code: course_code,
      },
    });
    res.status(200).json(papers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
