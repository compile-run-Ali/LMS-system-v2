import Image from 'next/image'
import React from 'react'

export default function LoginTopbar() {
  return (
    <div className='absolute bg-white top-0 w-full h-[80px] shadow-lg '>
        <div className="w-full flex justify-between items-center pl-5 pr-14">
            <div className="">
                <Image src='/logo.png' width={120} height={120} alt='logo' />
            </div>

            <div className=''>
                <button className='bg-blue-800 py-3 px-4 rounded-md text-white font-medium font-poppins'>
                    Faculty Login
                </button>
            </div>

        </div>
    </div>
  )
}
