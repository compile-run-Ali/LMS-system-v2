import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Wizard from '../Common/Wizard/Wizard'
import Form from '../Common/Form/Form'
import MCQTable from '../CreateObjective/ObjectiveExam'
import Exam from '../Exam/Exam'
import axios from 'axios'
import SubjectiveExam from '../CreateSubjective/SubjectiveExam'


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
  }
]

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
  }
]


export default function CreateExam({ paperType, mcqs }) {
  const router = useRouter()

  const [examDetails, setExamDetails] = useState(Object.keys(router.query).length !== 0 ? router.query : null)
  const [active, setActive] = useState(1);
  const [paperId, setPaperId] = useState(0);
  const [exam, setExam] = useState();

  const fetchExam = async () => {
    const res = await axios.post("/api/faculty/get_exam", {
      paper_id: paperId
    })
    setExam(res.data);
  }

  useEffect(() => {
    if (paperId !== 0 && !exam) {
      fetchExam();
    }
  }, [paperId]);


  return (
    <div className='w-full pl-6 mt-2'>
      <Wizard active={active} items={paperType === "Subjective/Objective" ? wizardItemsSubjective : wizardItemsObjective} />
      {
        active === 1 &&
        <Form setActive={setActive} setPaperId={setPaperId} examDetails={examDetails} paperType={paperType} />
      }
      {
        active === 2 && paperId !== 0 &&
        <div className='mt-10'>
            <MCQTable paperId={paperId} mcqs_data={mcqs} />
        </div>
      }
      {
        active === 3 && paperId !== 0 && paperType === "Objective" &&
        <div className='mt-10'>
          <Exam exam={exam} />
        </div>
      }
      {
        active === 3 && paperId !== 0 && paperType === "Subjective/Objective" &&
        <div className='mt-10'>
          <SubjectiveExam paperId={paperId} />
        </div>
      }
    </div>

  )
}
