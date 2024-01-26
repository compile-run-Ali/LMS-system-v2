import Courses_Subjects_Topics_btn from "../Courses_Subjects_Topics_btn";
import CourseModal from "../Modals/CoursesModal";
import SubjectModal from "../Modals/SubjectsModal";
import TopicModal from "../Modals/TopicsModal";
import View_Courses_Subjects_Topics from "./View_Courses_Subjects_Topics";
import React, { useState } from "react";
import axios from "axios";

export default function Courses_Subjects_Topics(){
    const [active, setActive] = useState(0)

    return(
        <div className="flex flex-col">
            <div>
                {active === 0 && <div className="flex flex-row justify-end pt-9">
                    <Courses_Subjects_Topics_btn btn_name={"Add Courses"} setActive={setActive}/>
                    <Courses_Subjects_Topics_btn btn_name={"Add Subjects"} setActive={setActive} />
                    <Courses_Subjects_Topics_btn btn_name={"Add Topics"} setActive={setActive} />
                </div>}
                {active === 1 && <CourseModal setActive={setActive}/>}
                {active === 2 && <SubjectModal setActive={setActive}/>}
                {active === 3 && <TopicModal setActive={setActive}/>}
            </div>
            <div className="mt-5">
                <p className="text-center block font-bold text-base mb-2">Select to view Courses, Subjects and Topics</p>
                <View_Courses_Subjects_Topics />

            </div>
        </div>
    )
}