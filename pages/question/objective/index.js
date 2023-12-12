import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import MCQTable from "@/components/CreateObjective/ObjectiveExam";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateObjectiveQuestions(){
    const router = useRouter();
    console.log("query to create objective question: ", router.query);

    // const [exam, setExam] = useState();
    // const [mcqs, setMCQs] = useState([]);
    // const [freeFlowGlobal, setFreeFlowGlobal] = useState(true);
    // console.log("router query", router.query);
    
    const exam = null;
    const setExam = null;
    const paperId = null;
    const setActive = null;
    const mcqs = [];
    const setMCQs = null;
    const freeFlowGlobal = null;


    return(
        <BaseLayout title={"Create Objective Questions"}>
            <DashboardLayout>
                <div className="mt-10">
                    <MCQTable
                        exam={exam}
                        setExam={setExam}
                        paperId={paperId}
                        setActive={setActive}
                        objective_questions={mcqs}
                        setObjectiveQuestions={setMCQs}
                        freeFlow={freeFlowGlobal}
                        btn_call={router.query.btn_call}
                    />
                </div>
            </DashboardLayout>
        </BaseLayout>
    )
}