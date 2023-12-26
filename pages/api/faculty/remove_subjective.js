import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  console.log("Delete Subjective Question request body", req.body);
  console.log("Delete Subjective Question requests.btn_call: ", req.body.btn_call);

  try {
    if(req.body.btn_call === "Create Question"){
      await prisma.DataBankQuestion.delete({
        where: {
          id: req.body.id,
        },
      })
    }
    else if(req.body.btn_call === "Generate Random Paper") {
      await prisma.subjectiveQuestion.delete({
        where: {
          sq_id: req.body.sq_id,
        },
      });
    }
    else if(req.body.flag === "deleteCurrentQuestions"){
      console.log("accessing flag")
      prisma.subjectiveQuestion.deleteMany({
        where: {
          sq_id: {
            in: req.body.subjectives_ids_array
          }
        }
      })
      .then(deleted => {
        console.log(`Deleted ${deleted.count} questions(s)`);
      })
    }
    else{
      //Remove Faculty
      await prisma.subjectiveQuestion.delete({
        where: {
          sq_id: req.body.sq_id,
        },
      })
    }
    await prisma.$disconnect();
    res
      .status(200)
      .json({ message: "Subjective Question Deleted Successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
