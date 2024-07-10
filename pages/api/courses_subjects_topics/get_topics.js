import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log("req.query in get_topics: ", req.query)
    // console.log("req.query['selectedSubject[]']: ", req.query['selectedSubject[]'].length)
    let all_topics = []
    try{
        if(req.query.flag === 'admin'){
            all_topics = await prisma.DbTopic.findMany({
                where: {course: req.query.selectedCourse, subject: req.query.selectedSubject}
            })
        }
        else {
            if(Array.isArray(req.query['selectedSubject[]'])){
                await Promise.all(req.query['selectedSubject[]'].map(async (subject, index) => {
                    let sub_temp = subject.split("-")
                    const topics = await prisma.DbTopic.findMany(
                        {where: {course: sub_temp[1], subject: sub_temp[0]}}
                    )
                    all_topics = [...all_topics, ...topics]
                    // console.log("all_topics: ", all_topics)
                }))
            }
            else{
                let sub_temp = req.query['selectedSubject[]'].split("-")
                all_topics = await prisma.DbTopic.findMany({
                    where: {course: sub_temp[1], subject: sub_temp[0]}
                })
            }
        }

        console.log("all_topics: ", all_topics)
        res.status(200).json(all_topics);
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}

export default handler;


// import prisma from "@/lib/prisma";

// const handler = async (req, res) => {
//     console.log("req.query: ", req.query)
//     try{
//         const topics = await prisma.DbTopic.findMany({
//             where: {course: req.query.selectedCourse, subject: req.query.selectedSubject}
//         })

//         console.log("topics: ", topics)
//         res.status(200).json(topics);
//     }
//     catch(error){
//         console.error("error message:", error.message)
//         res.status(500).json({ error });
//     }
// }

// export default handler;