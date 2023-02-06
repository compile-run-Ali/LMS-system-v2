import ArrowDownSVG from '@/svgs/arrow_down'
import NotificationSVG from '@/svgs/notification'
import Image from 'next/image'
import React, { useContext } from 'react'


export default function Topbar({ }) {

  return (
    <div className='flex items-center justify-between mr-10 h-[110px]'>
      <div className='flex'>
        <div className='logo'>
          <Image src='/logo.png' width={100} height={100} alt='logo' />
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <div className='notification-icon mr-5'>
          <NotificationSVG className="fill-blue-900" />
        </div>

        <div className='user-profile flex items-center gap-3'>
          <div className='w-8 h-8 p-1 rounded-full border border-blue-900'>

          </div>

          <div className='user-name'>
            <span className='font-medium font-poppins'>
              Random User
            </span>
          </div>

          <div className='arrow-down cursor-pointer'>
            <ArrowDownSVG className="fill-blue-900" />
          </div>
        </div>
      </div>
    </div>
  )
}
