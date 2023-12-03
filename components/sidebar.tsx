"use client";

import Link from "next/link";
import {signOut} from "next-auth/react";
import {Bell, Home, LogOut, Search, User} from "lucide-react";

import {cn} from "@/lib/utils";
import SidebarLogo from "./sidebar-logo";
import SidebarTweetButton from "./sidebar-tweet-button";

interface SidebarType {
  user: any;
  className: any;
}

const Sidebar = ({user, className}: SidebarType) => {
  return (
    <div
      className={cn("bg-gray-200 h-[50vh] mb-5 md:mb-0 md:h-screen", className)}
    >
      <div className="px-3 py-5 flex flex-col space-y-5">
        <SidebarLogo />
        <Link
          href={"/"}
          className="flex gap-2 hover:bg-sky-500 hover:text-white p-2 rounded"
        >
          <Home /> Home
        </Link>
        <Link
          href={"/notifications"}
          className="flex gap-2 hover:bg-sky-500 hover:text-white p-2 rounded"
        >
          <Bell /> Notifications
        </Link>
        <Link
          href={`/user/${user?.id}`}
          className="flex gap-2 hover:bg-sky-500 hover:text-white p-2 rounded"
        >
          <User /> Profile
        </Link>
        <Link
          href={`/search`}
          className="flex gap-2 hover:bg-sky-500 hover:text-white p-2 rounded"
        >
          <Search /> Search
        </Link>
        <div
          onClick={() => signOut()}
          className="flex gap-2 hover:bg-sky-500 hover:text-white p-2 rounded cursor-pointer"
        >
          <LogOut /> Logout
        </div>
        <SidebarTweetButton />
      </div>
    </div>
  );
};

export default Sidebar;
