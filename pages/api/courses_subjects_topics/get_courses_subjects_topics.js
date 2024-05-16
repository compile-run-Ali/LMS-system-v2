import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    let courses_subjects_topics = []
    try{
        const courses = await prisma.DbCourse.findMany({})
        for(let i = 0; i < courses.length; i++){
            // console.log(courses[i].name)
            const subjects = await prisma.DbSubject.findMany({where: {course: courses[i].name}})
            
            for(let j = 0; j < subjects.length; j++){
                // console.log(subjects[j].name, courses[i].name)
                const topics = await prisma.DbTopic.findMany({where: {course: courses[i].name, subject: subjects[j].name}})

                for(let k = 0; k < topics.length; k++){
                    // console.log(topics[k].name, subjects[j].name, courses[i].name)
                    const object = {course: courses[i].name, subject: subjects[j].name, topic: topics[k].name}
                    courses_subjects_topics = [...courses_subjects_topics, object]
                }
            }
        }
        res.status(200).json(courses_subjects_topics);
    }
    catch(error){
        console.error("error in get_courses_subjects_topics:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;