import { db } from "../db";
import { chatRooms, messages, users } from "../db/schema";
import { eq, or, and, desc, asc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export class ChatService {
  // Get my rooms
  async getRooms(userId: string) {
    // Complex query to get rooms + last message + other user info
    // Simplified: Fetch rooms allow listing
    const rooms = await db
      .select()
      .from(chatRooms)
      .where(or(eq(chatRooms.user1Id, userId), eq(chatRooms.user2Id, userId)))
      .orderBy(desc(chatRooms.lastMessageAt));

    // Populate other user info
    const populated = await Promise.all(
      rooms.map(async (room) => {
        const otherUserId =
          room.user1Id === userId ? room.user2Id : room.user1Id;
        const otherUser = await db
          .select()
          .from(users)
          .where(eq(users.id, otherUserId))
          .limit(1);
        return {
          ...room,
          otherUser: otherUser[0]
            ? { name: otherUser[0].name, avatar: otherUser[0].avatarUrl }
            : null,
        };
      })
    );

    return populated;
  }

  async getRoomMessages(roomId: string, userId: string) {
    // Verify access
    const room = await db
      .select()
      .from(chatRooms)
      .where(eq(chatRooms.id, roomId))
      .limit(1);
    if (!room.length) throw new Error("Room not found");
    if (room[0].user1Id !== userId && room[0].user2Id !== userId)
      throw new Error("Unauthorized");

    return await db
      .select()
      .from(messages)
      .where(eq(messages.roomId, roomId))
      .orderBy(asc(messages.createdAt));
  }

  async sendMessage(senderId: string, roomId: string, content: string) {
    const messageId = uuidv4();
    await db.insert(messages).values({
      id: messageId,
      roomId,
      senderId,
      content,
    });

    // Update room timestamp
    await db
      .update(chatRooms)
      .set({ lastMessageAt: new Date() })
      .where(eq(chatRooms.id, roomId));
    return { success: true, messageId };
  }

  // Create or Get Room (for clicking "Chat" on listing)
  async initiateChat(user1Id: string, user2Id: string, context?: string) {
    // Check existing room
    const existing = await db
      .select()
      .from(chatRooms)
      .where(
        or(
          and(eq(chatRooms.user1Id, user1Id), eq(chatRooms.user2Id, user2Id)),
          and(eq(chatRooms.user1Id, user2Id), eq(chatRooms.user2Id, user1Id))
        )
      )
      .limit(1);

    if (existing.length) return existing[0];

    // Create new
    const roomId = uuidv4();
    await db.insert(chatRooms).values({
      id: roomId,
      user1Id,
      user2Id,
      context,
      lastMessageAt: new Date(),
    });
    return { id: roomId };
  }
}
