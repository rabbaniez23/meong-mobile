import { db } from "../db";
import { notifications } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export class NotificationService {
  async getNotifications(userId: string) {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async markRead(id: string) {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id));
    return { success: true };
  }

  // Internal usage mainly
  async createNotification(
    userId: string,
    type: any,
    title: string,
    message: string,
    actionUrl?: string
  ) {
    await db.insert(notifications).values({
      id: uuidv4(),
      userId,
      type,
      title,
      message,
      actionUrl,
    });
  }
}
