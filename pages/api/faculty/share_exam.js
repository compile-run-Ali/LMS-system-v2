/* 
     {
        faculty_ids: selectedFacultyIds,
        exam: exam,
        shared_by:

      }
      send notification to faculties
*/

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { faculty_ids, exam, shared_by } = req.body;

  try {
    const notification = await prisma.notification.createMany({
      data: faculty_ids.map((faculty_id) => ({
        notification: `${shared_by} has shared ${exam.paper_name} result with you.`,
        faculty_id: faculty_id,
        exam_id: exam.paper_id,
      })),
    });
    res.status(200).json(notification);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
