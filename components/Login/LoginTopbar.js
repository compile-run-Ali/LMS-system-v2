import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function LoginTopbar({ facultyLogin }) {
    return (
        <div className='absolute bg-white top-0 w-full h-[80px] shadow-lg '>
            <div className="w-full flex justify-between items-center pl-5 pr-14">
                <div className="">
                    <Image src='/logo.png' width={120} height={120} alt='logo' />
                </div>

                <div className=''>
                    {
                        facultyLogin ?
                            <Link href={"/"}>

                                <button className='bg-blue-800 py-3 px-4 rounded-md text-white font-medium font-poppins mr-4'>
                                    Student Login
                                </button>
                            </Link>
                            :
                            <Link href={"/faculty"}>
                                <button className='bg-blue-800 py-3 px-4 rounded-md text-white font-medium font-poppins mr-4'>

                                    Faculty Login
                                </button>
                            </Link>
                    }
                </div>

            </div>
        </div>
    )
}
