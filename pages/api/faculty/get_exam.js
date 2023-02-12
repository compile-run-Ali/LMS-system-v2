import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
    const prisma = new PrismaClient()
    try {
        //get all papers
        const paper = await prisma.paper.findUnique({
            where: {
                paper_id: req.body.paper_id,
            },
            include: {
                course: false,
                examofficer: false,
                subjective_questions: true,
                objective_questions: true,
            },
        })
        res.status(200).json(paper)
    } catch (err) {
        throw new Error(err.message)
    }
}

export default handler;