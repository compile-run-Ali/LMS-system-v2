import ArrowDownSVG from "@/svgs/arrow_down";
import NotificationSVG from "@/svgs/notification";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NotificationDropdown from "./NotificationDropdown";
import axios from "axios";
import ClickAwayListener from "react-click-away-listener";
import { useRouter } from "next/router";
import { IoArrowBackSharp } from "react-icons/io5";

export default function Topbar() {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const session = useSession();
  const [dropdown, setDropdown] = useState(false);
  const logout = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      getNotifications();
    }
  }, [session.status]);

  const getNotifications = async () => {
    // get notifications from api for the logged in user
    const res = await axios.post("/api/faculty/get_notifications", {
      faculty_id: session.data.user.id,
    });

    setNotifications(res.data);
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-10 h-[110px]">
        <div className="flex">
          {router.pathname !== "/faculty" &&
            router.pathname !== "/admin" &&
            router.pathname !== "/student" && (
              <div
                className="cursor-pointer my-auto"
                onClick={() => router.back()}
              >
                <IoArrowBackSharp className="text-3xl text-blue-900 inline" />
              </div>
            )}
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <Image src="/logo.png" width={100} height={100} alt="logo" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ClickAwayListener onClickAway={() => setShowNotification(false)}>
            <div className="notification-icon mr-5">
              <div className="relative">
                <NotificationSVG
                  className="fill-blue-900 hover:cursor-pointer"
                  onClick={() => setShowNotification(!showNotification)}
                />
                {notifications.length > 0 && (
                  <span
                    className="absolute bottom-2 left-3 text-red-500 text-7xl hover:cursor-pointer"
                    onClick={() => setShowNotification(!showNotification)}
                  >
                    .
                  </span>
                )}
              </div>

              {showNotification && (
                <div className="fixed right-[180px] max-h-[300px] w-80">
                  <NotificationDropdown
                    notifications={notifications}
                    setNotifications={setNotifications}
                  />
                </div>
              )}
            </div>
          </ClickAwayListener>
          <div className="user-profile flex items-center gap-3">
            {session?.data?.user?.image && (
              <div className="w-8 h-8 rounded-full border border-blue-900 relative hover:scale-[3.0] hover:translate-y-5 hover:-translate-x-5 transition-all">
                <Image
                  src={`/uploads/${session?.data?.user?.image}`}
                  // src="/avatar.png"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full object-cover object-center"
                  alt="user"
                />
              </div>
            )}

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
          <div className="dropdown absolute -mt-8 space-y-2">
            {((session.data.user?.role === "faculty" &&
              session.data.user?.level < 5) ||
              session.data.user?.role === "student") && (
              <div
                onClick={() => {
                  console.log(session.data.user);
                  const user = session.data?.user || {};
                  router.push({
                    pathname: `/${session.data.user?.role}/profile`,
                    query: {
                      selfEdit: true,
                      faculty_id: session.data.user.id,
                    },
                  });
                }}
                className="flex items-center justify-center gap-3 rounded-lg bg-slate-100 px-10 py-2 font-poppins text-red-600 font-medium cursor-pointer"
              >
                See Profile
              </div>
            )}
            <div
              onClick={logout}
              className="flex items-center justify-center gap-3 rounded-lg bg-slate-100 px-10 py-2 font-poppins text-red-600 font-medium cursor-pointer "
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
