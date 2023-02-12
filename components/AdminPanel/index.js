import React, { useState } from 'react'
import FacultyTable from './Subcomponents/Faculty';
import Tabs from './Subcomponents/Tabs'

export default function AdminPanel() {
    const [active, setActive] = useState("Faculty");
  return (
    <div className='w-full pr-10 mt-5 px-5'>
        <Tabs active={active} setActive={setActive} />

        {
            active === "Faculty" &&
            <div>
            <FacultyTable />
            </div>

        }
        {
            active === "Courses" &&
            <div>
            </div>
        }
        {
            active === "Exams" &&
            <div>
            </div>
        }
    </div>
  )
}
