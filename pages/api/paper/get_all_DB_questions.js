import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log("req.body in get_all_DB_questions: ", req.query)
    try{
        const db_questions = await prisma.DataBankQuestion.findMany({
            where: {type: req.query.type}
        })
        res.status(200).json(db_questions);
    }
    catch(error){
        console.error("error message in get_all_DB_questions:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;