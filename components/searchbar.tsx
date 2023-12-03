"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Search} from "lucide-react";

import {Input} from "./ui/input";

const Searchbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/search?q=` + search);
      } else {
        router.push(`/search`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="flex gap-1 rounded-lg bg-gray-200 px-4 py-2 my-4 mx-1">
      <Search className="mt-2.5 text-black" />
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search posts`}
        className="border-none! bg-gray-200 text-base text-black outline-none! focus:border-none! focus:outline-0! focus-visible:ring-0 focus-visible:ring-gray-200 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Searchbar;
