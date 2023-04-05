import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const paperComments = await prisma.paperComment.findMany({
            where: {    
                paper_id: req.body.paper_id,
            },
            select: {
                faculty: {
                    select: {
                        name: true,
                        email: true,
                        level: true,
                        faculty_id: true,
                    },
                },
                comment: true,
                time: true,
                user_generated: true,
            },
        });
        res.status(200).json(paperComments);
    } catch (err) {
        throw new Error(err.message);
    }
}

export default handler;