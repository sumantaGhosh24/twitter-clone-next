"use client";

import {useMemo} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Heart, HeartOff, MessageCircle} from "lucide-react";
import {formatDistanceToNowStrict} from "date-fns";

import useLike from "@/actions/handleLike";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";

interface PostItemType {
  data: any;
  user: any;
}

const PostItem = ({user, data}: PostItemType) => {
  const router = useRouter();

  const {hasLiked, toggleLike} = useLike({
    postId: data.id,
    userId: user.id,
    data,
  });

  const goToUser = () => {
    router.push(`/user/${data.user.id}`);
  };

  const goToPost = () => {
    router.push(`/post/${data.id}`);
  };

  const onLike = () => {
    toggleLike();
  };

  const createdAt = useMemo(() => {
    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data.createdAt]);

  const LikeIcon = hasLiked ? <Heart color="red" /> : <HeartOff />;

  return (
    <div className="bg-gray-100 p-5 cursor-pointer hover:bg-gray-200 mb-4 mx-2">
      <div className="flex flex-row items-start gap-3">
        <Avatar>
          <AvatarImage src={data?.user?.profileImage} />
          <AvatarFallback>{data?.user?.name?.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="font-semibold cursor-pointer hover:underline"
            >
              {data?.user?.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline"
            >
              @{data?.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="mt-1" onClick={goToPost}>
            {data?.body}
          </div>
          <Image
            src={data?.image}
            height={100}
            width={100}
            alt="Tweet image"
            className="w-full h-full my-3 rounded"
          />
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer">
              <MessageCircle size={24} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer"
            >
              {LikeIcon}
              <p>{data.likedIds?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
