"use client";

import {useMemo} from "react";
import {useRouter} from "next/navigation";
import {formatDistanceToNowStrict} from "date-fns";

import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";

const CommentItem = ({data}: {data: any}) => {
  const router = useRouter();

  const goToUser = () => {
    router.push(`/user/${data.user.id}`);
  };

  const createdAt = useMemo(() => {
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div className="bg-gray-100 p-5 cursor-pointer hover:bg-gray-200 mb-4 mx-2">
      <div className="flex flex-row items-start gap-3">
        <Avatar>
          <AvatarImage src={data.user.profileImage} />
          <AvatarFallback>{data.user.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline"
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
