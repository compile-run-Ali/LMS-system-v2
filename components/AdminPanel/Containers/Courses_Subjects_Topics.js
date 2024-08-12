import Courses_Subjects_Topics_btn from "../Courses_Subjects_Topics_btn";
import CourseModal from "../Modals/CoursesModal";
import SubjectModal from "../Modals/SubjectsModal";
import TopicModal from "../Modals/TopicsModal";
import View_Courses_Subjects_Topics from "./View_Courses_Subjects_Topics";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Courses_Subjects_Topics(){
    const [active, setActive] = useState(0)
    const [topics, setTopics] = useState([])
    const [subjects, setSubjects] = useState([])
    const [error, setError] = useState("")
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState("")
    const [selectedSubject, setSelectedSubject] = useState("")
    const [selectedTopic, setSelectedTopic] = useState("")

    async function getCoursesList(){
        try{
            const coursesList = await axios.get("/api/courses_subjects_topics/get_courses")
            // console.log(coursesList.data)
            setCourses(coursesList.data.map((course) => {return course.name}))
            // console.log("courses: ", courses)
        }
        catch(error){
            console.log(error)
            setError("-- Can't fetch courses list --")
        }
    }

    async function getSubjectList(){
        console.log("selectedCourse in getSubjectList: ", selectedCourse)
        try{
            const subjectList = await axios.get("/api/courses_subjects_topics/get_subjects",{
                params:{
                    selectedCourse: selectedCourse
                }
            })
            // console.log("subjectList.data: ", subjectList.data)
            setSubjects(subjectList.data.map((subject) => {return subject.name}))
            // console.log("subjects in getSubjectList: ", subjects)
        }
        catch(error){
            console.log(error)
            setError("-- Can't fetch subjects list --")
        }
    }

    async function getTopicList(){
        console.log("selectedCourse in getSubjectList: ", selectedCourse)
        try{
            const topicList = await axios.get("/api/courses_subjects_topics/get_topics",{
                params:{
                    selectedCourse: selectedCourse,
                    selectedSubject: selectedSubject,
                    flag: "admin"
                }
            })
            console.log("topicList.data: ", topicList.data)
            setTopics(topicList.data.map((topic) => {return topic.name}))
            console.log("topics in gettopicsList: ", topics)
        }
        catch(error){
            console.log(error)
            setError("-- Can't fetch topic list --")
        }
    }

    useEffect(() => {
        getCoursesList()
    }, [])

    useEffect(() => {
        console.log("courses: ", courses)
        setSelectedCourse(courses[0])
        console.log("selectedCourse: ", selectedCourse)
        // getSubjectList()
    }, [courses])
    
    useEffect(() => {
        getSubjectList()
        console.log("selectedCourse in useEffect: ", selectedCourse)
    }, [selectedCourse])

    useEffect(() => {
        console.log("subjects in useEffect: ", subjects)
        setSelectedSubject(subjects[0])
    }, [subjects])

    useEffect(() => {
        getTopicList()
    }, [selectedSubject])

    useEffect(() => {
        setSelectedTopic(topics[0])
    }, [topics])

    return(
        <div className="flex flex-col">
            <div className="flex flex-col justify-center">
                {active === 0 && <div className="flex flex-row justify-end pt-9 px-5">
                    <Courses_Subjects_Topics_btn btn_name={"Add Courses"} setActive={setActive}/>
                    <Courses_Subjects_Topics_btn btn_name={"Add Subjects"} setActive={setActive} />
                    <Courses_Subjects_Topics_btn btn_name={"Add Topics"} setActive={setActive} />
                </div>}
                {active === 1 && <CourseModal setActive={setActive} getCoursesList={getCoursesList}/>}
                {active === 2 && <SubjectModal setActive={setActive} courses={courses} getSubjectList={getSubjectList} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}/>}
                {active === 3 && <TopicModal setActive={setActive} courses={courses} subjects={subjects} getTopicList={getTopicList} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}/>}
            </div>
            <div className="mt-5">
                <p className="text-center block font-bold text-base mb-2">Select to view Courses, Subjects and Topics</p>
                <View_Courses_Subjects_Topics 
                    courses={courses}
                    subjects={subjects}
                    topics={topics}
                    selectedCourse={selectedCourse}
                    selectedSubject={selectedSubject}
                    selectedTopic={selectedTopic}
                    setSelectedCourse={setSelectedCourse}
                    setSelectedSubject={setSelectedSubject}
                    setSelectedTopic={setSelectedTopic}
                    error={error}
                    setError={setError}
                />
            </div>
        </div>
    )
}