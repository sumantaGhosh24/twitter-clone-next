"use server";

import {revalidatePath} from "next/cache";

import {db} from "@/lib/prismadb";

export async function createComment(body: any, postId: string, userId: string) {
  try {
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid post id.");
    }
    const comment = await db.comment.create({
      data: {
        body,
        userId: userId,
        postId,
      },
    });
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (post?.userId) {
      await db.notification.create({
        data: {
          body: "There is a new notification.",
          userId: post.userId,
        },
      });
      await db.user.update({
        where: {
          id: post.userId,
        },
        data: {
          hasNotification: true,
        },
      });
    }
    revalidatePath("/post/[slug]", "page");
  } catch (error) {
    console.log(error);
  }
}
