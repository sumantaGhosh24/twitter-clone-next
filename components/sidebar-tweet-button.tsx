"use client";

import {useRouter} from "next/navigation";
import {Feather} from "lucide-react";

const SidebarTweetButton = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center justify-between"
    >
      <div
        className="
        rounded-full 
        h-10
        w-10
        flex
        items-center
        justify-center 
        bg-sky-500 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      "
      >
        <Feather size={16} color="white" />
      </div>
      <div
        className="
        px-3
        py-1
        rounded-full
        bg-sky-500
        hover:bg-opacity-90 
        cursor-pointer max-w-fit
      "
      >
        <p
          className=" 
            text-center
            font-semibold
            text-white 
            text-[20px]
        "
        >
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
