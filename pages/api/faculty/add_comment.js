import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const addPaperComment = await prisma.paperComment.create({
            data: {
                comment: req.body.comment,
                faculty: {
                    connect: {
                        faculty_id: req.body.faculty_id,
                    }
                },
                paper: {
                    connect: {
                        paper_id: req.body.paper_id,
                    },
                },
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
            },
        });
        res.status(200).json(addPaperComment);
    } catch (err) {
        throw new Error(err.message);
    }
};

export default handler;