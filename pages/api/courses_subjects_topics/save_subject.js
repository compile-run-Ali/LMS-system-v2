import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log(req.body)
    try{
        const subject = await prisma.DbSubject.create({
            data: {
              name: req.body.subject,
              course: req.body.selectedCourse
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