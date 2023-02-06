import React from 'react'
import Wizard from '../Common/Wizard/Wizard'
import Form from '../Common/Form/Form'

export default function CreateExam() {
  return (
    <div className='w-full pl-10 mt-5'>
        <Wizard active={"Exam Settings"} />
        <Form />
    </div>
  )
}
