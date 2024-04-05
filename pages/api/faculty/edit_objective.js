import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  console.log("Edit Objective Question request body", req.body);
  console.log("Edit Objective Question requests.btn_call: ", req.body.btn_call);
  console.log("Edit Objective Question requests.question_info: ", req.body.question_info);
  try {
    if(req.body.btn_call === "Create Question"){
      const updatedOQ = await prisma.DataBankQuestion.update({
        where: {
          id: req.body.question_info.id
        },
        data:{
          question: req.body.question_info.question,
          correct_answer: req.body.question_info.correct_answer,
          answers: req.body.question_info.answers,
          marks: req.body.question_info.marks,
          authority: req.body.question_info.authority,
          timeAllowed: req.body.question_info.timeAllowed,
          difficulty: req.body.question_info.difficulty,
          course: req.body.question_info.course,
          subject: req.body.question_info.subject,
          topic: req.body.question_info.topic
        }
      })
      console.log("result of update mcq: ", updatedOQ)
      res.status(200).json(updatedOQ);
    }
    else{
      const updatedOQ = await prisma.objectiveQuestion.update({
        where: {
          oq_id: req.body.question_info.oq_id,
        },
        data: {
          question: req.body.question_info.question,
          correct_answer: req.body.question_info.correct_answer,
          authority: req.body.question_info.authority,
          answers: req.body.question_info.answers,
          marks: req.body.question_info.marks,
          timeAllowed: req.body.question_info.timeAllowed,
          
        },
      });
      res.status(200).json(updatedOQ);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
