"use server";

import bcrypt from "bcrypt";

import {db} from "@/lib/prismadb";

interface RegisterTypes {
  name: string;
  username: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterTypes) {
  try {
    const {email, name, password, username} = data;
    if (!email || !password || !username || !name) {
      throw new Error("All fields are required.");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        email,
        username,
        name,
        password: hashPassword,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(userId: string) {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user id.");
    }
    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    const followersCount = await db.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });
    return {...existingUser, followersCount};
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers() {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(data: any) {
  try {
    const {id, name, username, bio, profileImage, coverImage} = data;
    if (!name || !username) {
      throw new Error("All fields are required.");
    }
    const updateUser = await db.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });
    return updateUser;
  } catch (error) {
    console.log(error);
  }
}

export async function handleFollow(
  userId: string,
  currentUserId: string,
  method: "POST" | "DELETE"
) {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user id.");
    }
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("User not exists.");
    }
    let updatedFollowingIds = [...(user.followingIds || [])];
    if (method === "POST") {
      updatedFollowingIds.push(userId);
      await db.notification.create({
        data: {
          body: "Someone followed you.",
          userId,
        },
      });
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });
    }
    if (method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }
    const updateUser = await db.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    return updateUser;
  } catch (error) {
    console.log(error);
  }
}
