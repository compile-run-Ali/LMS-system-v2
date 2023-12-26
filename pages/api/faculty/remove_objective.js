import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  console.log("Delete Objective Question request body", req.body);
  console.log("Delete Objective Question requests.btn_call: ", req.body.btn_call);
  try {
    if(req.body.btn_call === "Create Question"){
      await prisma.DataBankQuestion.delete({
        where: {
          id: req.body.id,
        },
      })
    }
    else if(req.body.btn_call === "Generate Random Paper") {
      await prisma.objectiveQuestion.delete({
        where: {
          oq_id: req.body.oq_id,
        },
      });
    }
    else if(req.body.flag === "deleteCurrentQuestions"){
      console.log("accessing flag")
      prisma.objectiveQuestion.deleteMany({
        where: {
          oq_id: {
            in: req.body.mcqs_ids_array
          }
        }
      })
      .then(deleted => {
        console.log(`Deleted ${deleted.count} questions(s)`);
      })
    }
    else{
      //Remove Faculty
      await prisma.objectiveQuestion.delete({
        where: {
          oq_id: req.body.id,
        },
      });
    }
    await prisma.$disconnect();
    res
      .status(200)
      .json({ message: "Objective Question Deleted Successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
