import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Wizard from '../Common/Wizard/Wizard'
import Form from '../Common/Form/Form'
import MCQTable from '../CreateObjective/ObjectiveExam'

export default function CreateExam({paperType}) {
  const router = useRouter()
  
  const [examDetails, setExamDetails] = useState(Object.keys(router.query).length !== 0 ? router.query :null)
  const [active, setActive] = useState("Exam Settings");
  const [paperId, setPaperId] = useState(0);

  return (
    <div className='w-full pl-6 mt-2'>
      <Wizard active={active} />
      {
        active === "Exam Settings" &&
        <Form setActive={setActive} setPaperId={setPaperId} examDetails={examDetails} paperType={paperType} />
      }
      {
        active === "Exam Questions" && paperId !== 0 &&
        <div className='mt-10'>
          <MCQTable paperId={paperId} />
        </div>
      }
    </div>
  )
}
