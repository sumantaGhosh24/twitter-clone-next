"use server";

import {db} from "@/lib/prismadb";

export async function getNotifications(userId: string) {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user id.");
    }
    const notifications = await db.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });
    return notifications;
  } catch (error) {
    console.log(error);
  }
}
