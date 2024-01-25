import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log("req.query: ", req.query)
    try{
        const subjects = await prisma.DbSubject.findMany({
            where: {course: req.query.selectedCourse}
        })

        console.log("subjects: ", subjects)
        res.status(200).json(subjects);
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;