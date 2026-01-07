import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export class UserService {
  async getProfile(userId: string) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    if (!user.length) return null;
    const { passwordHash, ...safeUser } = user[0];
    return safeUser;
  }

  async updateProfile(
    userId: string,
    data: any,
    avatarUrl?: string,
    kycUrl?: string
  ) {
    const updateData: any = { ...data };
    if (avatarUrl) updateData.avatarUrl = avatarUrl;
    if (kycUrl) updateData.kycImageUrl = kycUrl;

    await db.update(users).set(updateData).where(eq(users.id, userId));
    return this.getProfile(userId);
  }
}
