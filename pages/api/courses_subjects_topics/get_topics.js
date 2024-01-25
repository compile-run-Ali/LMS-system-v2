import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log("req.query: ", req.query)
    try{
        const topics = await prisma.DbTopic.findMany({
            where: {course: req.query.selectedCourse, subject: req.query.selectedSubject}
        })

        console.log("topics: ", topics)
        res.status(200).json(topics);
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;