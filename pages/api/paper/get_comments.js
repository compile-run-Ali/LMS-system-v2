import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const paperComments = await prisma.paperComment.findMany({
            where: {    
                paper_id: req.body.paper_id,
            },
        });
        res.status(200).json(paperComments);
    } catch (err) {
        throw new Error(err.message);
    }
}

export default handler;