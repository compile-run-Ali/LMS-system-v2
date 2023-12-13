import BaseLayout from "@/components/BaseLayout/BaseLayout"
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout"
import SubjectiveExam from "@/components/CreateSubjective/SubjectiveExam"
import { useRouter } from "next/router"

export default function CreateSubjectiveQuestions(){
    const router = useRouter()
    console.log("query to create subjective question: ", router.query);

    const exam = null;
    const setExam = null;
    const paperId = null;
    const setActive = null;
    const subjectives = [];
    const setSubjectives = null;

    return(
        <BaseLayout title={"Create Objective Questions"}>
            <DashboardLayout>
                <div className="mt-10">
                <SubjectiveExam
                    exam={exam}
                    setExam={setExam}
                    paperId={paperId}
                    setActive={setActive}
                    subjective_questions={subjectives}
                    setSubjectiveQuestions={setSubjectives}
                    btn_call={router.query.btn_call}
                    />
                </div>
            </DashboardLayout>
        </BaseLayout>
    )
}