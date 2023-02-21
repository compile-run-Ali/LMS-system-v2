import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
    const prisma = new PrismaClient()
    try {
        //get all papers
        const paper = await prisma.paper.findUnique({
            where: {
                paper_id: req.body.paper_id,
            },
            select: {
                examofficer: {
                    select: {
                        faculty_id: true
                    }
                },
                paper_name: true,
                paper_type: true,
                time: true,
                date: true,
                duration: true,
                weightage: true,
                freeflow: true,
                status: true,
                paper_id: true,
            }
        })
        res.status(200).json(paper)
    } catch (err) {
        throw new Error(err.message)
    }
}

export default handler;