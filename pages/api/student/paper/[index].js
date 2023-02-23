// api to fetch papers of student using course in which he is enrolled

import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new  PrismaClient();
  const { index } = req.query;
  const p_number = Number(index);
  console.log("finding courses of ", p_number);
  try {
    const course = await prisma.sRC.findMany({
      where: {
        p_number: p_number,
      },
    });
    if (!course) {
      console.log("course_code not found");
      return res.status(404).json("Course not found");
    }
    const course_code = course[0].course_code;
    console.log('above find course',course_code);
    const papers = await prisma.paper.findMany({
      where: {
        course_code: course_code,
      },
    });
    console.log('below find course');
    res.status(200).json(papers);
  } catch {
    console.log("inside catch");
    res.status(500).json({ error: "Server Error" });
  }
}
