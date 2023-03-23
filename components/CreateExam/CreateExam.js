import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Wizard from "../Common/Wizard/Wizard";
import Form from "../Common/Form/Form";
import MCQTable from "../CreateObjective/ObjectiveExam";
import Exam from "../Exam/Exam";
import axios from "axios";
import SubjectiveExam from "../CreateSubjective/SubjectiveExam";
import IeExam from "../CreateIE/IeExam";

const wizardItemsObjective = [
  {
    id: 1,
    title: "Exam Settings",
  },
  {
    id: 2,
    title: "Exam Questions",
  },
  {
    id: 3,
    title: "Exam Review",
  },
];

const wizardItemsSubjective = [
  {
    id: 1,
    title: "Exam Settings",
  },
  {
    id: 2,
    title: "Objective Questions",
  },
  {
    id: 3,
    title: "Subjective Questions",
  },
  {
    id: 4,
    title: "Exam Review",
  },
];

export default function CreateExam({ paperType }) {
  const router = useRouter();

  const [examDetails, setExamDetails] = useState(
    Object.keys(router.query).length > 1 ? router.query : null
  );
  const [active, setActive] = useState(1);
  const [paperId, setPaperId] = useState(
    examDetails ? examDetails.paper_id : 0
  );
  const [exam, setExam] = useState();
  const [mcqs, setMCQs] = useState([]);
  const [subjectives, setSubjectives] = useState([]);
  const [freeFlowGlobal, setFreeFlowGlobal] = useState(false);
  const [ieFiles, setIeFiles] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      console.log("router is ready");
      setExamDetails(
        Object.keys(router.query).length > 1 ? router.query : null
      );
    }
  }, [router]);

  const fetchExam = async () => {
    const res = await axios.post("/api/faculty/get_exam", {
      paper_id: paperId,
    });
    setExam(res.data);
  };

  const fetchObjectives = async () => {
    const res = await axios.post("/api/faculty/get_objective", {
      paper_id: paperId,
    });
    setMCQs(res.data);
  };

  const fetchIeFiles = async () => {
    const res = await axios.post("/api/faculty/get_ie_files", {
      paper_id: paperId,
    });
    setIeFiles(res.data);
  };

  const fetchSubjectives = async () => {
    await axios
      .post("/api/faculty/get_subjective", {
        paper_id: paperId,
      })
      .then((res) => {
        const allQuestion = res.data;
        setSubjectives(res.data.filter((question) => !question.parent_sq_id));
        console.log("allQuestion", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (paperId !== 0 && !exam) {
      fetchExam();
    }
    if (paperType === "Objective" && paperId !== 0) {
      fetchObjectives();
    }
    if (paperType === "Subjective/Objective" && paperId !== 0) {
      fetchObjectives();
      fetchSubjectives();
    }
    if (paperType === "IE" && paperId !== 0) {
      fetchIeFiles();
    }
  }, [paperId, exam, paperType]);

  // console.log("subjectives", subjectives);
  console.log("mcqs", mcqs);

  return (
    <div className="w-full pl-6 mt-2">
      <Wizard
        active={active}
        items={
          paperType === "Subjective/Objective"
            ? wizardItemsSubjective
            : wizardItemsObjective
        }
      />
      {active === 1 && (
        <Form
          setActive={setActive}
          setPaperId={setPaperId}
          examDetails={examDetails}
          paperType={paperType}
          setFreeFlowGlobal={setFreeFlowGlobal}
        />
      )}
      {active === 2 && paperId !== 0 && paperType !== "IE" && (
        <div className="mt-10">
          <MCQTable
            exam={exam}
            paperId={paperId}
            setActive={setActive}
            objective_questions={mcqs}
            setObjectiveQuestions={setMCQs}
            freeFlow={freeFlowGlobal}
          />
        </div>
      )}
      {active === 2 && paperId !== 0 && paperType === "IE" && (
        <div className="mt-10">
          <IeExam
          paperId={paperId}
          setActive={setActive}
          exam={exam}
          ieFiles={ieFiles}
          />
        </div>
      )}
      {active === 3 && paperId !== 0 && paperType === "Objective" && (
        <div className="mt-10">
          <Exam
            exam={exam}
            objectiveQuestions={mcqs}
            subjectiveQuestions={subjectives}
            isEdit={true}
            setActive={setActive}
          />
        </div>
      )}
            {active === 3 && paperId !== 0 && paperType === "IE" && (
        <div className="mt-10">
          <Exam
            exam={exam}
            objectiveQuestions={mcqs}
            subjectiveQuestions={subjectives}
            isEdit={true}
            setActive={setActive}
          />
        </div>
      )}
      {active === 3 &&
        paperId !== 0 &&
        paperType === "Subjective/Objective" && (
          <div className="mt-10">
            <SubjectiveExam
              paperId={paperId}
              setActive={setActive}
              subjective_questions={subjectives}
              setSubjectiveQuestions={setSubjectives}
            />
          </div>
        )}
      {active === 4 &&
        paperId !== 0 &&
        paperType === "Subjective/Objective" && (
          <div className="mt-10">
            <Exam
              exam={exam}
              objectiveQuestions={mcqs}
              subjectiveQuestions={subjectives}
              isEdit={true}
              setActive={setActive}
            />
          </div>
        )}
    </div>
  );
}
