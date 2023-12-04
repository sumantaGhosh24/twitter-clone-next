"use client";

import Link from "next/link";
import {signOut} from "next-auth/react";
import {Bell, Home, LogOut, Search, User} from "lucide-react";

import SidebarLogo from "./sidebar-logo";
import SidebarTweetButton from "./sidebar-tweet-button";

interface SidebarType {
  user: any;
}

const Sidebar = ({user}: SidebarType) => {
  return (
    <div className="bg-gray-200 h-[60vh] mb-5 md:mb-0 md:h-screen w-full md:w-1/4">
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
