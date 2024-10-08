import prisma from "@/lib/prisma";


const handler = async (req, res) => {
  console.log("Edit Subjective Question request body", req.body);
  console.log("Edit Subjective Question requests.btn_call: ", req.body.btn_call);

  const {
    sq_id,
    question,
    answer,
    marks,
    long_question,
    parent_sq_id,
    questionnumber,
    difficulty,
    authority
  } = req.body;

  try {
    if(req.body.btn_call === "Create Question"){
      console.log("in edit subjective via Create Question")

      const updatedSQ = await prisma.DataBankQuestion.update({
        where: {
          id: req.body.id
        },
        data: {
          question: req.body.question,
          correct_answer: req.body.correct_answer,
          marks: req.body.marks,
          difficulty: req.body.difficulty,
          authority: req.body.authority,
          course: req.body.course,
          subject: req.body.subject,
          topic: req.body.topic,
        },
      })
      
      res.status(200).json(updatedSQ);
    }
    else{
      const updatedQuestion = await prisma.$transaction(async (prisma) => {
        // Update the subjective question
        const updatedSQ = await prisma.subjectiveQuestion.update({
          where: {
            sq_id,
          },
          data: {
            question: question,
            answer: answer,
            authority: authority,
            difficulty: difficulty,
            marks: marks,
            long_question: long_question,
            questionnumber: questionnumber,
          },
        });

        // Check if the question has a parent question
        if (parent_sq_id) {
          const parentSQ = await prisma.subjectiveQuestion.findUnique({
            where: {
              sq_id: parent_sq_id,
            },
            include: {
              child_question: true,
            },
          });

          // If the question was previously connected to a parent, remove it from the parent's child_question array
          if (updatedSQ.parent_sq_id) {
            await prisma.subjectiveQuestion.update({
              where: {
                sq_id: updatedSQ.parent_sq_id,
              },
              data: {
                child_question: {
                  disconnect: {
                    sq_id: updatedSQ.sq_id,
                  },
                },
              },
            });
          }

          // Connect the question to its new parent and update the parent's child_question array
          await prisma.subjectiveQuestion.update({
            where: {
              sq_id: parent_sq_id,
            },
            data: {
              child_question: {
                connect: {
                  sq_id: updatedSQ.sq_id,
                },
              },
            },
          });
        } else {
          // If the question no longer has a parent, disconnect it from its current parent
          if (updatedSQ.parent_sq_id) {
            await prisma.subjectiveQuestion.update({
              where: {
                sq_id: updatedSQ.parent_sq_id,
              },
              data: {
                child_question: {
                  disconnect: {
                    sq_id: updatedSQ.sq_id,
                  },
                },
              },
            });
          }
        }

        return updatedSQ;
      });
      res.status(200).json(updatedQuestion);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while updating the subjective question.",
    });
  }
};

export default handler;
