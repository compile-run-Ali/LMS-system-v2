import prisma from "@/lib/prisma";

const handler = async (req, res) => {
    console.log("req.body in get_questions_databank: ", req.body)
    console.log("easy, medium, hard: ",
                parseInt(req.body.randomPaperConfig.no_of_easy), 
                parseInt(req.body.randomPaperConfig.no_of_medium), 
                parseInt(req.body.randomPaperConfig.no_of_hard))
    
    req.body.randomPaperConfig.type === "objective" ? console.log("prevMCQsID: ", req.body.prevMCQsID) : console.log("subjective")

    try{
        if(req.body.flag === "regen"){
            let new_questions_db = []
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

            console.log("to regen mcq_ids: ", to_regen)

            //finding unique pairs of course and topic
            const questions_to_regen_info = await prisma.DataBankQuestion.findMany({
                where: {
                    id: {in: to_regen}
                },
                select: {
                    id: true,
                    course: true,
                    subject: true,
                    topic: true,
                    difficulty: true,
                    type: true
                }
            })
            console.log("questions_to_regen_info: ", questions_to_regen_info)
            let unique_pairs = Array.from(new Set(questions_to_regen_info.map(question => JSON.stringify({course: question.course, subject: question.subject, topic: question.topic, difficulty: question.difficulty, type: question.type})))).map(str => JSON.parse(str));
            console.log("unique_pairs: ", unique_pairs)

            let count_pair = await Promise.all(unique_pairs.map(async (pair) => {
                const qs = await prisma.DataBankQuestion.findMany({
                    where: {
                        course: pair.course,
                        subject: pair.subject,
                        topic: pair.topic,
                        difficulty: pair.difficulty,
                        type: pair.type,
                        id: { notIn: total_ids }
                    }
                });
                return qs.length;
            }));            
            console.log("count of pair in db: ", count_pair)

            //generating grouped questions
            let grouped_questions = {};

            for(let question of questions_to_regen_info) {
                let key = JSON.stringify({course: question.course, subject: question.subject, topic: question.topic, difficulty: question.difficulty, type: question.type});
                if(!grouped_questions[key]) {
                    grouped_questions[key] = [];
                }
                grouped_questions[key].push(question);
            }
            console.log("grouped_questions: ", grouped_questions);
            
            //getting count of each group of questions for regen
            for(let i = 0; i < unique_pairs.length; i++){
                let key = JSON.stringify({course: unique_pairs[i].course, subject: unique_pairs[i].subject, topic: unique_pairs[i].topic, difficulty: unique_pairs[i].difficulty, type: unique_pairs[i].type});
                console.log("length pair in map: ", grouped_questions[key].length,count_pair)
                if(count_pair[i] < grouped_questions[key].length){
                    console.log("Not enough questions in DB to regenerate selected questions.")
                    res.status(503).json({message: "Not enough questions in DB to regenerate selected questions."})
                    return
                }
            }

            for(let i = 0; i < unique_pairs.length; i++){
                let key = JSON.stringify({course: unique_pairs[i].course, subject: unique_pairs[i].subject, topic: unique_pairs[i].topic, difficulty: unique_pairs[i].difficulty, type: unique_pairs[i].type});
                const new_questions = await prisma.DataBankQuestion.findMany({
                    where:{
                        difficulty: unique_pairs[i].difficulty,
                        course: unique_pairs[i].course,
                        topic: unique_pairs[i].topic,
                        type: unique_pairs[i].type,
                        id: {notIn: total_ids}
                    },
                    take: grouped_questions[key].length
                })
                console.log("new_questions fetched for regen: ", new_questions)
                total_ids = [...total_ids, ...new_questions.map(q => q.id)]
                new_questions_db = [...new_questions_db, ...new_questions]
            }

            const difficultyOrder = {
                "Easy": 1,
                "Medium": 2,
                "Hard": 3
            };
            
            // Sort the questions based on the difficulty
            new_questions_db.sort((a, b) => {
                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
            })
            console.log("new_questions_db after concat["+new_questions_db.length+"]: ", new_questions_db)
            res.status(200).json(new_questions_db);
        }
        else{
            let easy_questions = []
            let total_ids = [...req.body.prevMCQsID]
            for(let i = 0; i < req.body.randomPaperConfig.topic.length; i++){
                console.log("topic: ", req.body.randomPaperConfig.topic[i].split('-')[0])
                console.log("topic: ", req.body.randomPaperConfig.topic[i].split('-')[1])
                console.log("topic: ", req.body.randomPaperConfig.topic[i].split('-')[2])

                const fetched_questions = await prisma.$queryRaw
                        `SELECT * FROM DataBankQuestion
                        WHERE difficulty = "Easy" AND
                        topic = ${req.body.randomPaperConfig.topic[i].split('-')[0]} AND
                        course = ${req.body.randomPaperConfig.topic[i].split('-')[1]} AND
                        subject = ${req.body.randomPaperConfig.topic[i].split('-')[2]} AND
                        type = ${req.body.randomPaperConfig.type} AND
                        id NOT IN (${total_ids.join(',')})
                        ORDER BY RAND() 
                        LIMIT ${parseInt(req.body.randomPaperConfig.no_of_easy)}`;
                console.log("fetched_questions: ", fetched_questions)
                easy_questions = [...easy_questions, ...fetched_questions]
                total_ids = [...total_ids, ...easy_questions.map(q => q.id)]
            }
            // console.log("easy_questions in get_databank_questions: ", easy_questions)
            if(Array.isArray(easy_questions) && easy_questions.length < req.body.randomPaperConfig.no_of_easy){
                res.status(503).json({message: "Not enough questions for easy category for the selected topics."});
                return
            }

            let medium_questions = []
            for(let i = 0; i < req.body.randomPaperConfig.topic.length; i++){
                
                const fetched_questions = await prisma.$queryRaw
                        `SELECT * FROM DataBankQuestion
                        WHERE difficulty = "Medium" AND
                        topic = ${req.body.randomPaperConfig.topic[i].split('-')[0]} AND
                        course = ${req.body.randomPaperConfig.topic[i].split('-')[1]} AND
                        subject = ${req.body.randomPaperConfig.topic[i].split('-')[2]} AND
                        type = ${req.body.randomPaperConfig.type} AND
                        id NOT IN (${total_ids.join(',')})
                        ORDER BY RAND() 
                        LIMIT ${parseInt(req.body.randomPaperConfig.no_of_medium)}`;
                medium_questions = [...medium_questions, ...fetched_questions]
                total_ids = [...total_ids, ...medium_questions.map(q => q.id)]
            }
            // console.log("medium_questions in get_databank_questions: ", medium_questions)
            if(Array.isArray(medium_questions) && medium_questions.length < req.body.randomPaperConfig.no_of_medium){
                res.status(503).json({message: "Not enough questions for medium category for the selected topics."});
                return
            }

            let hard_questions = []
            for(let i = 0; i < req.body.randomPaperConfig.topic.length; i++){
                
                const fetched_questions = await prisma.$queryRaw
                        `SELECT * FROM DataBankQuestion
                        WHERE difficulty = "Hard" AND
                        topic = ${req.body.randomPaperConfig.topic[i].split('-')[0]} AND
                        course = ${req.body.randomPaperConfig.topic[i].split('-')[1]} AND
                        subject = ${req.body.randomPaperConfig.topic[i].split('-')[2]} AND
                        type = ${req.body.randomPaperConfig.type} AND
                        id NOT IN (${total_ids.join(',')})
                        ORDER BY RAND() 
                        LIMIT ${parseInt(req.body.randomPaperConfig.no_of_hard)}`;
                hard_questions = [...hard_questions, ...fetched_questions]
                total_ids = [...total_ids, ...hard_questions.map(q => q.id)]
            }
            // console.log("hard_questions in get_databank_questions: ", hard_questions)
            if(Array.isArray(hard_questions) && hard_questions.length < req.body.randomPaperConfig.no_of_hard){
                res.status(503).json({message: "Not enough questions for hard category for the selected topics."});
                return
            }

            let easy_questions_final = []
            for(let i = 0; i < req.body.randomPaperConfig.no_of_easy; i++) {
                let randomIndex = Math.floor(Math.random() * easy_questions.length);
                easy_questions_final = [...easy_questions_final, easy_questions[randomIndex]]
                easy_questions.splice(randomIndex, 1)
            }

            let medium_questions_final = []
            for(let i = 0; i < req.body.randomPaperConfig.no_of_medium; i++) {
                let randomIndex = Math.floor(Math.random() * medium_questions.length);
                medium_questions_final = [...medium_questions_final, medium_questions[randomIndex]]
                medium_questions.splice(randomIndex, 1)
            }

            let hard_questions_final = []
            for(let i = 0; i < req.body.randomPaperConfig.no_of_hard; i++) {
                let randomIndex = Math.floor(Math.random() * hard_questions.length);
                hard_questions_final = [...hard_questions_final, hard_questions[randomIndex]]
                hard_questions.splice(randomIndex, 1)
            }


            // console.log("EASY questions fetched from DataBankQuestions: ", easy_questions_final)
            // console.log("MEDIUM questions fetched from DataBankQuestions: ", medium_questions_final)
            // console.log("HARD questions fetched from DataBankQuestions: ", hard_questions_final)

            let questions = [...easy_questions_final, ...medium_questions_final, ...hard_questions_final]
            questions = questions.filter((ques) => {if(ques !== null && ques !== undefined){return ques}})
            console.log("questions after concat["+questions.length+"]: ", questions)

            // let ids = questions.filter(obj => {if(obj !== null && obj !== undefined){ return obj.id}});
            let ids = questions.filter(obj => obj !== null && obj !== undefined).map(obj => obj.id);
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