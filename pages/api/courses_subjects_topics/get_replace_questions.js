import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log("req in get_replace_questions: ", req.query)
    try{
        const replace_questions = await prisma.DataBankQuestion.findMany({
            where: {
                course: req.query.course,
                subject: req.query.subject,
                topic: req.query.topic,
                difficulty: req.query.difficulty,
                type: req.query.type,
                id: { notIn: req.query['prevMCQsID[]'] }
            }
        })
        console.log("replace_questions: ", replace_questions)
        res.status(200).json(replace_questions);
    }
    catch(error){
        console.error("error message in get_replace_questions:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;