import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  console.log("Update Objective Question request body", req.body);
  console.log("Update Objective Question requests.btn_call: ", req.body.btn_call);
  console.log("Update Objective Question requests.question_info: ", req.body.question_info);

  try {
    if(req.body.btn_call === "Create Question"){
      console.log("btn call recived at update")
      const updatedOQ = await prisma.DataBankQuestion.update({
        where:{ id: req.body.question_info.id},
        data:{
          question: req.body.question_info.question,
          answers: req.body.question_info.answers,
          marks: req.body.question_info.marks,
          correct_answer: req.body.question_info.correct_answer,
          timeAllowed: req.body.question_info.timeAllowed,
          difficulty: req.body.question_info.difficulty,
          course: req.body.question_info.course,
          subject: req.body.question_info.subject,
          topic: req.body.question_info.topic,
          type: req.body.question_info.type
        }
      })
      console.log("prisma create response: ", updatedOQ)
      res.status(200).json(updatedOQ);
    }
    else{
      const updatedOQ = await prisma.objectiveQuestion.update({
        where: {
          oq_id: req.body.oq_id,
        },
        data: {
          question: req.body.question,
          correct_answer: req.body.correct_answer,
          answers: req.body.answers,
          marks: req.body.marks,
          timeAllowed: req.body.timeAllowed,
          
        },
      });
      res.status(200).json(updatedOQ);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
