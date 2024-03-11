import prisma from "@/lib/prisma";


const handler = async (req, res) => {
  console.log("Add Subjective Question request body", req.body);
  console.log("Add Subjective Question requests.btn_call: ", req.body.btn_call);
  console.log("Add Subjective Question requests.question_info: ", req.body.question_info);

  try {
    if(req.body.btn_call === "Create Question"){
      console.log("access to control create question")
      const newSubjective = await prisma.DataBankQuestion.create({
        data: {
          question: req.body.question_info.question,
          correct_answer: req.body.question_info.answer,
          marks: req.body.question_info.marks,
          difficulty: req.body.question_info.difficulty,
          course: req.body.question_info.course,
          subject: req.body.question_info.subject[0],
          topic: req.body.question_info.topic[0],
          type: req.body.question_info.type
        }
      })
      console.log("prisma create response: ", newSubjective)
      res.status(200).json(newSubjective);
    }
    else{
      console.log("default add subjective")
      // Use transaction API to ensure that both create and update operations are executed as a single transaction
      const result = await prisma.$transaction(async (prisma) => {
        let updatedSQ;

        // Create new SQ and connect to paper
        const newSQ = await prisma.subjectiveQuestion.create({
          data: {
            question: req.body.question_info.question,
            answer: req.body.question_info.answer,
            marks: req.body.question_info.marks,
            long_question: req.body.question_info.long_question,
            questionnumber: req.body.question_info.questionnumber,
            paper: {
              connect: {
                paper_id: req.body.question_info.paper_id,
              },
            },
          },
        });

        updatedSQ = newSQ;
        // Update parent question and add child question to its "child_question" array
        if (req.body.parent_sq_id) {
          await prisma.subjectiveQuestion.update({
            where: {
              sq_id: req.body.question_info.parent_sq_id,
            },
            data: {
              child_question: {
                connect: {
                  sq_id: newSQ.sq_id,
                },
              },
            },
            select: {
              sq_id: true,
              question: true,
              marks: true,
              long_question: true,
              parent_sq_id: true,
              questionnumber: true,
              child_question: true,
              answer:true,
            },
          });
        }

        return updatedSQ;
      });

      res.status(200).json({
        ...result,
        parent_sq_id: req.body.question_info.parent_sq_id,
      });
    }
  } 
  catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to add" });  }
};

export default handler;
