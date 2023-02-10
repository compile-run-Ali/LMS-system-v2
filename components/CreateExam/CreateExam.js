import React from 'react'
import Wizard from '../Common/Wizard/Wizard'
import Form from '../Common/Form/Form'

export default function CreateExam() {
  return (
    <div className='w-full pl-6 mt-2'>
        <Wizard active={"Exam Settings"} />
        <Form />
    </div>
  )
}
