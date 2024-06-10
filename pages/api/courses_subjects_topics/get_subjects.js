import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log("req.query in get_subjects: ", req.query)
    let all_subjects = []
    try{
        // const subjects = await prisma.DbSubject.findMany({
        //     where: {course: req.query["selectedCourse[]"]}
        // })
        if(Array.isArray(req.query['selectedCourse[]'])){
            await Promise.all(req.query['selectedCourse[]'].map(async (course, index) => {
                console.log("course in map: ", course)
                const subjects = await prisma.DbSubject.findMany(
                    {where: {course: course}}
                )
                all_subjects = [...all_subjects, ...subjects]
                console.log("all_subjects: ", all_subjects)
            }))
        }
        else{
            all_subjects = await prisma.DbSubject.findMany({
                where: {course: req.query["selectedCourse[]"]}
            })
        }

        console.log("subjects: ", all_subjects)
        res.status(200).json(all_subjects);
    }
    catch(error){
        console.error("error message in get_subjects:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;