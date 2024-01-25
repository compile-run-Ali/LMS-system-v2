import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    try{
        const courses = await prisma.DbCourse.findMany({})
        res.status(200).json(courses);
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;