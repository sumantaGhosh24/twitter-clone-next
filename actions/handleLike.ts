"use client";

import {useMemo, useCallback} from "react";

import {useToast} from "@/components/ui/use-toast";
import {handleLike} from "./posts";

interface UseLikeType {
  postId: string;
  userId: string;
  data: any;
}

export default function useLike({postId, userId, data}: UseLikeType) {
  const {toast} = useToast();

  const hasLiked = useMemo(() => {
    const list = data?.likedIds || [];
    return list.includes(userId);
  }, [data, userId]);

  const toggleLike = useCallback(async () => {
    try {
      if (hasLiked) {
        handleLike(postId, userId, "DELETE");
      } else {
        handleLike(postId, userId, "POST");
      }
      toast({
        title: "Like successful!",
      });
    } catch (error: any) {
      toast({
        title: "Like failed!",
        variant: "destructive",
      });
    }
  }, [userId, hasLiked, postId]);

  return {
    hasLiked,
    toggleLike,
  };
}
