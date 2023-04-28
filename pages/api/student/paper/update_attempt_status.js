import prisma from "@/lib/prisma";

export default async function handler(req, res) {

  try {
    const {
      studentId,
      paperId,
      status,
      obtainedMarks,
      studentComment,
      teacherComment,
      timeStarted,
      timeCompleted,
    } = req.body;

    // find an existing record with the provided id
    let existingSPA = await prisma.sPA.findUnique({
      where: { spaId: studentId + paperId },
    });

    // if the record does not exist, create a new one
    if (!existingSPA) {
      existingSPA = await prisma.sPA.create({
        data: {
          spaId: studentId + paperId,
          studentId: studentId,
          paperId: paperId,
        },
      });
    }

    // update the status and marks of the paper if both are present
    const updatedSPA = await prisma.sPA.update({
      where: { spaId: studentId + paperId },
      data: {
        status: status !== undefined ? status : existingSPA.status,
        obtainedMarks: obtainedMarks
          ? obtainedMarks
          : obtainedMarks === 0
          ? 0
          : existingSPA.obtainedMarks,
        studentComment:
          studentComment !== undefined
            ? studentComment
            : existingSPA.studentComment,
        teacherComment:
          teacherComment !== undefined
            ? teacherComment
            : existingSPA.teacherComment,
        timeStarted: timeStarted ? timeStarted : existingSPA.timeStarted,
        timeCompleted: timeCompleted
          ? timeCompleted
          : existingSPA.timeCompleted,
      },
    });

    res.status(200).json(updatedSPA);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}
