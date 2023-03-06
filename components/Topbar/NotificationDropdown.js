import { getNotificationTime } from '@/utils/NotificationTime'
import axios from 'axios';
import React from 'react'

export default function NotificationDropdown({notifications}) {
    console.log(notifications, "notifications")

    const markAsRead = async (id) => {
        const res = await axios.post("http://localhost:3000/api/faculty/markNotificationRead", {
            notification_id: id,
        });

        console.log(res, "res")
    }

    return (
        <div className=" w-full h-full mt-2 bg-white rounded-md shadow-lg z-20 ">
            <div className="">
             {notifications.map((notification, index) => (
                <div  key={index} className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2" onClick={()=>markAsRead(notification.notification_id)}>
                    <p className="text-gray-600 text-sm mx-2 flex items-end">
                        <span className="font-semibold font-poppins text-red-600" href="#">{notification.notification}</span>
                        <span className='ml-2 text-xs mb-1 text-gray-400'>{getNotificationTime(notification.time)}</span>
                    </p>
                </div>))}
            </div>

            {notifications.length === 0 && <div className="text-center text-gray-400 font-poppins text-xs py-4">No notifications yet</div>}
        </div>

    )
}
