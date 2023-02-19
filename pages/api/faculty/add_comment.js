import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
    const prisma = new PrismaClient();
    try {
        const addPaperComment = await prisma.paperComment.create({
            data: {
                comment: req.body.comment,
                paper: {
                    connect: {
                        paper_id: req.body.paper_id,
                    },
                },
                faculty: {
                    connect: {
                        faculty_id: req.body.faculty_id,
                    },
                },
                
            },
        });
        res.status(200).json(addPaperComment);
    } catch (err) {
        throw new Error(err.message);
    }
};