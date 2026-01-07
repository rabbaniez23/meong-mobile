import { db } from "../db";
import { communityPosts, comments, likes, users, stories } from "../db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export class CommunityService {
  // --- POSTS ---
  async getPosts(
    currentUserId: string,
    category?: "Kesehatan" | "Event" | "Diskusi" | "Trending"
  ) {
    let query = db
      .select({
        id: communityPosts.id,
        category: communityPosts.category,
        content: communityPosts.content,
        imageUrl: communityPosts.imageUrl,
        likesCount: communityPosts.likesCount,
        commentsCount: communityPosts.commentsCount,
        createdAt: communityPosts.createdAt,
        user: {
          name: users.name,
          avatar: users.avatarUrl,
        },
        isLiked: sql<boolean>`CASE WHEN ${likes.id} IS NOT NULL THEN true ELSE false END`,
      })
      .from(communityPosts)
      .leftJoin(users, eq(communityPosts.userId, users.id))
      .leftJoin(
        likes,
        and(
          eq(likes.postId, communityPosts.id),
          eq(likes.userId, currentUserId)
        )
      )
      .orderBy(desc(communityPosts.createdAt));

    if (category && category !== "Trending") {
      // Trending logic is different usually, but simplified here
      query = query.where(eq(communityPosts.category, category as any)) as any;
    }

    return await query;
  }

  async createPost(userId: string, data: any, imageUrl: string | null) {
    const postId = uuidv4();
    await db.insert(communityPosts).values({
      id: postId,
      userId,
      category: data.category,
      content: data.content,
      imageUrl: imageUrl,
    });
    return { success: true, postId };
  }

  // --- COMMENTS ---
  async getComments(postId: string) {
    return await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        user: {
          name: users.name,
          avatar: users.avatarUrl,
        },
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.postId, postId))
      .orderBy(comments.createdAt);
  }

  async addComment(userId: string, postId: string, content: string) {
    const commentId = uuidv4();
    await db.insert(comments).values({
      id: commentId,
      postId,
      userId,
      content,
    });

    await db
      .update(communityPosts)
      .set({ commentsCount: sql`${communityPosts.commentsCount} + 1` })
      .where(eq(communityPosts.id, postId));

    return { success: true };
  }

  // --- LIKES ---
  async likePost(userId: string, postId: string) {
    try {
      await db.insert(likes).values({
        id: uuidv4(),
        postId,
        userId,
      });
      await db
        .update(communityPosts)
        .set({ likesCount: sql`${communityPosts.likesCount} + 1` })
        .where(eq(communityPosts.id, postId));
      return { success: true };
    } catch (e) {
      // Already liked usually or DB constraint
      return { success: false };
    }
  }

  // --- STORIES ---
  async getStories() {
    // Group by User logic is complex in SQL only, usually done in app, but we can return flat list
    // returning list of users who have stories
    // Simplified: Return all active stories with user info
    const activeStories = await db
      .select({
        id: stories.id,
        type: stories.type,
        content: stories.content,
        imageUrl: stories.imageUrl,
        backgroundColor: stories.backgroundColor,
        userId: stories.userId,
        user: {
          name: users.name,
          avatar: users.avatarUrl,
        },
      })
      .from(stories)
      .leftJoin(users, eq(stories.userId, users.id))
      .where(sql`${stories.expiresAt} > NOW()`)
      .orderBy(desc(stories.createdAt));

    return activeStories;
  }

  async createStory(userId: string, data: any, imageUrl: string | null) {
    const storyId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24h expiry

    await db.insert(stories).values({
      id: storyId,
      userId,
      type: data.type, // 'image' or 'text'
      content: data.content,
      imageUrl: imageUrl,
      backgroundColor: data.backgroundColor,
      expiresAt,
    });
    return { success: true };
  }
}
