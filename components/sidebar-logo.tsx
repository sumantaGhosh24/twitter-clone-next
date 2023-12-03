"use client";

import {useRouter} from "next/navigation";
import {Twitter} from "lucide-react";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center cursor-pointer bg-sky-500 hover:bg-sky-500/80"
      onClick={() => router.push("/")}
    >
      <Twitter size={32} strokeWidth={3} color="white" />
    </div>
  );
};

export default SidebarLogo;
