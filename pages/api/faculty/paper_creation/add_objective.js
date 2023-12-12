import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  console.log("Add Objective Question request body", req.body);
  console.log("Add Objective Question requests.btn_call: ", req.body.btn_call);
  console.log("Add Objective Question requests.question_info: ", req.body.question_info);
  try {
    if (req.body.btn_call === "Create Question"){
      console.log("access to control create question")
    }
    else{
      //Create New Objective Question
      const newObjective = await prisma.objectiveQuestion.create({
        data: {
          question: req.body.question_info.question,
          answers: req.body.question_info.answers,
          marks: req.body.question_info.marks,
          correct_answer: req.body.question_info.correct_answer,
          timeAllowed: req.body.question_info.timeAllowed,
          paper: {
            connect: {
              paper_id: req.body.question_info.paper_id,
            },
          },
        },
      });
      res.status(200).json(newObjective);
    }
    //Update Paper enty with new questions
    // await prisma.paper.update({
    //   where: {
    //     paper_id: req.body.paper_id,
    //   },
    //   data: {
    //     objective_questions: {
    //       connect: {
    //         oq_id: newObjective.oq_id,
    //       },
    //     },
    //   },
    // })
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
