import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log(req.body)
    console.log("easy, medium, hard: ",
                parseInt(req.body.randomPaperConfig.no_of_easy), 
                parseInt(req.body.randomPaperConfig.no_of_medium), 
                parseInt(req.body.randomPaperConfig.no_of_hard))
    
    req.body.type === "objective" ? console.log("prevMCQsID: ", req.body.prevMCQsID) : ""

    try{
        if(req.body.flag === "regen"){
            let new_questions = []
            let total_ids = [...req.body.prevMCQsID]

            let to_regen = []
            if(req.body.mcqs_to_regen_ids){
                console.log("to_regen === req.body.mcqs_to_regen_ids")
                to_regen = req.body.mcqs_to_regen_ids
            }
            else if(req.body.subs_to_regen_ids){
                console.log("to_regen === req.body.subs_to_regen_ids")
                to_regen = req.body.subs_to_regen_ids
            }

            for (let i = 0; i < to_regen.length; i++){
                console.log("total_ids: ", total_ids)

                const question = await prisma.DataBankQuestion.findUnique({
                    where:{
                        id: to_regen[i]
                    }
                })
                console.log("question["+question.id+"] in regen: ", question)

                const new_question = await prisma.DataBankQuestion.findFirst({
                    where:{
                        course: question.course,
                        subject: question.subject,
                        topic: question.topic,
                        type: question.type,
                        id: {notIn: total_ids}
                    }
                })
                total_ids = [...total_ids, new_question.id]

                console.log("new_question in regen: ", new_question)
                new_questions = [...new_questions, new_question]
            }
            console.log("new_questions after concat["+new_questions.length+"]: ", new_questions)
            res.status(200).json(new_questions);
        }
        else{
            const easy_questions = await prisma.$queryRaw
            `SELECT * FROM DataBankQuestion
            WHERE difficulty = "Easy" AND
            course = ${req.body.randomPaperConfig.course} AND
            subject = ${req.body.randomPaperConfig.subject} AND
            topic = ${req.body.randomPaperConfig.topic} AND
            type = ${req.body.randomPaperConfig.type} AND
            id NOT IN (${req.body.prevMCQsID.join(',')})
            ORDER BY RAND() 
            LIMIT ${parseInt(req.body.randomPaperConfig.no_of_easy)}`;

            const medium_questions = await prisma.$queryRaw
                        `SELECT * FROM DataBankQuestion 
                        WHERE difficulty = "Medium" AND
                        course = ${req.body.randomPaperConfig.course} AND
                        subject = ${req.body.randomPaperConfig.subject} AND
                        topic = ${req.body.randomPaperConfig.topic} AND
                        type = ${req.body.randomPaperConfig.type} AND
                        id NOT IN (${req.body.prevMCQsID.join(',')})
                        ORDER BY RAND() 
                        LIMIT ${parseInt(req.body.randomPaperConfig.no_of_medium)}`;

            const hard_questions = await prisma.$queryRaw
                        `SELECT * FROM DataBankQuestion 
                        WHERE difficulty = "Hard" AND
                        course = ${req.body.randomPaperConfig.course} AND
                        subject = ${req.body.randomPaperConfig.subject} AND
                        topic = ${req.body.randomPaperConfig.topic} AND
                        type = ${req.body.randomPaperConfig.type} AND
                        id NOT IN (${req.body.prevMCQsID.join(',')})
                        ORDER BY RAND() 
                        LIMIT ${parseInt(req.body.randomPaperConfig.no_of_hard)}`;

            // console.log("questions fetched from DataBankQuestions: ", questions)
            console.log("EASY questions fetched from DataBankQuestions: ", easy_questions)
            console.log("MEDIUM questions fetched from DataBankQuestions: ", medium_questions)
            console.log("HARD questions fetched from DataBankQuestions: ", hard_questions)

            let questions = [...easy_questions, ...medium_questions, ...hard_questions]
            console.log("questions after concat["+questions.length+"]: ", questions)

            let ids = questions.map(obj => obj.id);
            console.log("ids of new questions: ", ids)
            console.log("ids of prevquestions: ", req.body.prevMCQsID)

            let hasCommonElement = ids.some(item => req.body.prevMCQsID.includes(item));
            console.log("ids == req.body.prevMCQsID: ", hasCommonElement)
            res.status(200).json(questions);
        }
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}
export default handler;

// while(hasCommonElement){
//     // Find the duplicate question
//     let duplicateQuestion = questions.find(question => req.body.prevMCQsID.includes(question.id));

//     // Fetch a replacement question
//     let replacementQuestion = await prisma.$queryRaw
//         `SELECT * FROM DataBankQuestion 
//         WHERE difficulty = "${duplicateQuestion.difficulty}" AND
//         course = ${req.body.randomPaperConfig.course} AND
//         subject = ${req.body.randomPaperConfig.subject} AND
//         topic = ${req.body.randomPaperConfig.topic} AND
//         type = ${req.body.randomPaperConfig.type} AND
//         id NOT IN (${[...ids, ...req.body.prevMCQsID].join(',')})
//         ORDER BY RAND() 
//         LIMIT 1`;

//     // Replace the duplicate question with the replacement
//     questions = questions.map(question => question.id === duplicateQuestion.id ? replacementQuestion[0] : question);
//     ids = questions.map(obj => obj.id);

//     // Check again for duplicates
//     hasCommonElement = ids.some(item => req.body.prevMCQsID.includes(item));
// }