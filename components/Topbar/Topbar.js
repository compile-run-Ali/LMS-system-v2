import ArrowDownSVG from "@/svgs/arrow_down";
import NotificationSVG from "@/svgs/notification";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";

export default function Topbar({ admin }) {
  const session = useSession();
  const [dropdown, setDropdown] = useState(false);

  const logout = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mr-10 h-[110px]">
        <div className="flex">
          <div className="logo">
            <Image src="/logo.png" width={100} height={100} alt="logo" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="notification-icon mr-5">
            <NotificationSVG className="fill-blue-900" />
          </div>

          <div className="user-profile flex items-center gap-3">
            <div className="w-8 h-8 p-1 rounded-full border border-blue-900"></div>

            <div className="user-name">
              <span className="font-medium font-poppins">
                {session?.data?.user?.name}
              </span>
            </div>

            <div
              className="arrow-down cursor-pointer"
              onClick={() => setDropdown(!dropdown)}
            >
              <ArrowDownSVG className="fill-blue-900" />
            </div>
          </div>
        </div>
      </div>
      {dropdown && (
        <div className="flex justify-end mr-10">
          <div className="dropdown absolute bg-slate-100 -mt-5 px-20 py-5  rounded-lg">
            <div className="flex items-center gap-3">
              <span
                className="font-poppins text-red-600 font-medium cursor-pointer"
                onClick={logout}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
