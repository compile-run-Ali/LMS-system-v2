import { PrismaClient } from "@prisma/client";

//the route is /api/student/paper/get_attempt_status

const handler = async (req, res) => {
  const prisma = new PrismaClient();
    try {
        const SPA = await prisma.sPA.findMany({
            where : {
                studentId: req.query.id,
            },
            select: {
                paperId: true,
                status: true,
            },
        });
        res.status(200).json(SPA);
    }
    catch(err) {
        res.status(500).json({ error: "Server Error" });
    }
}


export default handler;