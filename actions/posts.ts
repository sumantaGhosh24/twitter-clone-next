"use server";

import {revalidatePath} from "next/cache";

import {db} from "@/lib/prismadb";

export async function getPost(postId: string) {
  try {
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid post id.");
    }
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPost(data?: string) {
  try {
    if (!data || typeof data !== "string") {
      throw new Error("Invalid post id.");
    }
    const posts = await prisma?.post.findMany({
      where: {
        OR: [{body: {contains: data, mode: "insensitive"}}],
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(body: any) {
  try {
    const {id, text, image} = body;
    const post = await db.post.create({
      data: {
        userId: id,
        body: text,
        image,
      },
    });
    revalidatePath("/");
    revalidatePath("/user/[slug]", "page");
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts(userId?: string) {
  try {
    let posts;
    if (userId && typeof userId === "string") {
      posts = await db.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await db.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function handleLike(
  postId: string,
  userId: string,
  method: "POST" | "DELETE"
) {
  try {
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid post id.");
    }
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      throw new Error("Post not exists.");
    }
    let updateLikedIds = [...(post.likedIds || [])];
    if (method === "POST") {
      updateLikedIds.push(userId);
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (post?.userId) {
        await db.notification.create({
          data: {
            body: "You have an new notification.",
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
    }
    if (method === "DELETE") {
      updateLikedIds = updateLikedIds.filter((likedId) => likedId !== userId);
    }
    const updatePost = await db.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updateLikedIds,
      },
    });
    revalidatePath("/");
    revalidatePath("/search");
    revalidatePath("/user/[slug]", "page");
    return updatePost;
  } catch (error) {
    console.log(error);
  }
}
