"use client";

import {useMemo} from "react";
import {Calendar} from "lucide-react";
import {format} from "date-fns";

import useFollow from "@/actions/handleFollow";
import {Button} from "./ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";

interface UserBioType {
  userId: string;
  fetchUser: any;
  user: any;
}

const UserBio = ({userId, fetchUser, user}: UserBioType) => {
  const {isFollowing, toggleFollow} = useFollow({
    userId,
    currentUser: user,
  });

  const createdAt = useMemo(() => {
    return format(new Date(fetchUser.createdAt), "MMMM yyyy");
  }, [fetchUser?.createdAt]);

  return (
    <div className="border-b border-neutral-800">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <Avatar className="h-14 w-14">
              <AvatarImage src={fetchUser?.profileImage} />
              <AvatarFallback>
                {fetchUser?.name?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-4">
              <p className="capitalize text-2xl font-semibold mb-1">
                {fetchUser?.name}
              </p>
              <p className="text-md text-neutral-900 font-medium">
                @{fetchUser?.username}
              </p>
            </div>
          </div>
          {user?.id !== userId && (
            <Button
              onClick={toggleFollow}
              variant={isFollowing ? "secondary" : "primary"}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>

        <div className="flex flex-col mt-4">
          <p>{fetchUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-900">
            <Calendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p>{fetchUser?.followingIds?.length}</p>
            <p className="text-neutral-900">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p>{fetchUser?.followersCount || 0}</p>
            <p className="text-neutral-900">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
