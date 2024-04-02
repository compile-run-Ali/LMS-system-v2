import BaseLayout from "@/components/BaseLayout/BaseLayout";
import DashboardLayout from "@/components/DasboardLayout/DashboardLayout";
import DashboardComponent from "@/components/DashboardComponent/DashboardComponent";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import Tabs from "@/components/AdminPanel/Tabs";
import Courses_Subjects_Topics from "@/components/AdminPanel/Containers/Courses_Subjects_Topics";
import DB_Questions from "@/components/DB_Questions/DB_Questions";

export default function Dashboard() {
  const session = useSession();
  const [exams, setExams] = useState(null);
  const [paperapproval, setPaperApproval] = useState(null);
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null); // [course_code, course_name
  // const [control, setControl] = useState(0) //0 for exam, 1 for subject and topic, 2 for edit db questions
  const [active, setActive] = useState("Exams");
  const fetchExams = () => {
    axios
      .post("/api/faculty/get_exams", {
        faculty_id: session.data.user.id,
        course_code: localStorage.getItem("selectedCourse"),
      })
      .then((res) => {
        console.log(res, "check");
        console.log(res.data.selectedCoursePapers, "ahah");
        setExams(res.data.courses);
        setPaperApproval(res.data.paperapproval);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error in api: /api/faculty/get_exams", error);
      });
  };

  useEffect(() => {
    setActive("Exams")
  }, [])

  useEffect(() => {
    if (session.status === "authenticated") {
      fetchExams();
    }
  }, [session, selectedCourse]);
  useEffect(() => {
    if (session.status === "authenticated") {
      fetchExams();
    }
  }, [session]);
  console.log(exams, "exams to dash");
  return (
    <BaseLayout title={"Dashboard"}>
      <DashboardLayout>
        {loading || exams === null 
        ? <Loader /> 
        : (
          <div>
            <div className="px-6"><Tabs active={active} setActive={setActive} role={"Instructor"}/></div>

            {active === "Exams" && 
              <DashboardComponent
              exams_data={exams}
              paperapproval_data={paperapproval}
              level={session.data.user.level}
              setSelectedCourseDash={setSelectedCourse}
              />}

            {active === "Courses_Subjects_Topics" && 
              <Courses_Subjects_Topics/>}

            {active === "DB_Questions" &&
              <DB_Questions />}
            
          </div>
        )}
      </DashboardLayout>
    </BaseLayout>
  );
}
