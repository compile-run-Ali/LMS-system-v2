// delete ftc record where course_code and faculty_id match

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { course_code, faculty_id } = req.body;
  try {
    const deleted = await prisma.fTC.deleteMany({
      where: {
        course_code: course_code,
        faculty_id: faculty_id,
      },
    });
    res.status(200).json(deleted);
  } catch {
    res.status(500).json({ message: "Error in deleting faculty from course" });
  }
}
