import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log(req.body)
    try{
        const subject = await prisma.DbTopic.create({
            data: {
              name: req.body.topic,
              course: req.body.selectedCourse,
              subject:req.body.selectedSubject
            }
        })
        res.status(200).json(subject);
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;