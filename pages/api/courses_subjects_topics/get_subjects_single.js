import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log("req in get_subjects_single: ", req.query)
    try{
        const subjects = await prisma.DbSubject.findMany({
            where: {course: req.query.selectedCourse}
        })
        res.status(200).json(subjects);
    }
    catch(error){
        console.error("error message in get_subjects_single:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;