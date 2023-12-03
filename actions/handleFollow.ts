"use client";

import {useMemo, useCallback} from "react";

import {useToast} from "@/components/ui/use-toast";
import {handleFollow} from "./users";

interface UseFollowType {
  userId: string;
  currentUser: any;
}

export default function useFollow({userId, currentUser}: UseFollowType) {
  const {toast} = useToast();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    try {
      if (isFollowing) {
        handleFollow(userId, currentUser?.id, "DELETE");
      } else {
        handleFollow(userId, currentUser?.id, "POST");
      }
      toast({
        title: "Follow successful!",
      });
    } catch (error: any) {
      toast({
        title: "Follow failed!",
        variant: "destructive",
      });
    }
  }, [currentUser, isFollowing, userId]);

  return {
    isFollowing,
    toggleFollow,
  };
}
