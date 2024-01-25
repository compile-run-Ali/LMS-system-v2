import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log(req.body)
    try{
        const course = await prisma.DbCourse.create({
            data: {
              name: req.body.course,
            }
        })
        res.status(200).json(course);
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;
