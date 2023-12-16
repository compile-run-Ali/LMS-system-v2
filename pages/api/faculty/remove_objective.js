import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  console.log("Delete Objective Question request body", req.body);
  console.log("Delete Objective Question requests.btn_call: ", req.body.btn_call);
  console.log("Delete Objective Question requests.question_info: ", req.body.question_info);
  try {
    if(req.body.btn_call === "Create Question"){
      console.log("btn call recived at delete")
      await prisma.DataBankQuestion.delete({
        where: {id: req.body.question_info.id}
      })
      res
        .status(200)
        .json({ message: "Objective Question Deleted Successfully" });
    }
    else{
      //Remove Faculty
      await prisma.objectiveQuestion.delete({
        where: {
          oq_id: req.body.oq_id,
        },
      });
      await prisma.$disconnect();
      res
        .status(200)
        .json({ message: "Objective Question Deleted Successfully" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
