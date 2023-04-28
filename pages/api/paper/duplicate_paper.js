import prisma from "@/lib/prisma";


export default async function handler(req, res) {
  try {
    console.log("FINDING PAPER", req.body);
    const { id } = req.body;
    const originalPaper = await prisma.paper.findUnique({
      where: { paper_id: id },
      include: {
        objective_questions: true,
        subjective_questions: true,
        ie_questions: true,
      },
    });
    if (!originalPaper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const {
      paper_id,
      examofficer,
      PaperComment,
      attempts,
      ie_questions,
      objective_questions,
      subjective_questions,
      ...newPaper
    } = originalPaper;

    const newObjectiveQuestions = originalPaper.objective_questions.map(
      (question) => {
        const { oq_id, ...newQuestion } = question;
        return newQuestion;
      }
    );

    const newSubjectiveQuestions = originalPaper.subjective_questions.map(
      (question) => {
        const { sq_id, ...newQuestion } = question;
        return newQuestion;
      }
    );

    const newIEQuestions = originalPaper.ie_questions.map((question) => {
      const { ie_id, ...newQuestion } = question;
      return newQuestion;
    });

    console.log("NEW PAPER", newPaper);

    const createdPaper = await prisma.paper.create({
      data: {
        ...newPaper,
        paper_name: `${newPaper.paper_name} (copy)`,
        status: "Draft",
      },
    });

    const createdObjectiveQuestions = await prisma.objectiveQuestion.createMany(
      {
        data: newObjectiveQuestions.map((question) => ({
          ...question,
          paper_id: createdPaper.paper_id,
        })),
      }
    );

    const createdSubjectiveQuestions =
      await prisma.subjectiveQuestion.createMany({
        data: newSubjectiveQuestions.map((question) => ({
          ...question,
          paper_id: createdPaper.paper_id,
        })),
      });

    const createdIEQuestions = await prisma.ieQuestion.createMany({
      data: newIEQuestions.map((question) => ({
        ...question,
        paper_id: createdPaper.paper_id,
      })),
    });

    return res.status(200).json({
      ...createdPaper,
      objective_questions: createdObjectiveQuestions,
      subjective_questions: createdSubjectiveQuestions,
      ie_questions: createdIEQuestions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
