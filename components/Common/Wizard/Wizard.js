import Link from 'next/link'
import React from 'react'

const items = [
    {
        id: 1,
        title: "Exam Settings",
        link: "/faculty/create_exam",
    },
    {
        id: 2,
        title: "Exam Questions",
        link: "/faculty/create_exam/objective",
    },
    {
        id: 3,
        title: "Exam Review",
        link: "/faculty/create_exam/review",
    }
]

export default function Wizard({ active, items }) {
    return (
        <div className=' font-cabin flex justify-between items-center border-b border-primary-black border-opacity-20 w-full max-w-[550px] '>
            {items.map(item => (
                <Link key={item.id} href={item.link} >
                    <div className={`w-full flex py-6 mr-5 gap-x-2 ${active === item.title ? 'border-b-[3px]  border-[#FEC703]' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${active === item.title ? 'bg-blue-800' : 'border border-primary-black border-opacity-30'}`}>
                            <span className={`font-bold text-sm ${active === item.title ? "text-white" : "text-primary-black"}`}>
                                {item.id}
                            </span>
                        </div>

                        <span className={`font-medium text-primary-black`}>
                            {item.title}
                        </span>
                    </div>
                </Link>
            ))}

        </div>
    )
}

Wizard.defaultProps = {
    items: items,
    active: "Exam Settings"
}