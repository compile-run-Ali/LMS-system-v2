import React, { useState } from 'react'
import Wizard from '../Common/Wizard/Wizard'
import Form from '../Common/Form/Form'
import MCQTable from '../CreateObjective/ObjectiveExam'

export default function CreateExam() {
  const [active, setActive] = useState("Exam Settings");
  const [paperId, setPaperId] = useState(0);

  return (
    <div className='w-full pl-6 mt-2'>
      <Wizard active={active} />
      {
        active === "Exam Settings" &&
        <Form setActive={setActive} setPaperId={setPaperId} />
      }
      {
        active === "Exam Questions" &&
        <div className='mt-10'>
          <MCQTable />
        </div>
      }
    </div>
  )
}
