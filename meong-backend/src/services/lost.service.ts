import { db } from "../db";
import { lostReports, lostImages, foundReports } from "../db/schema";
import { eq, and, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export class LostService {
  async getAllReports(filters: any) {
    // Can add distance filter here using Haversine formula via raw SQL if needed later
    const reports = await db
      .select()
      .from(lostReports)
      .orderBy(desc(lostReports.createdAt));

    const results = await Promise.all(
      reports.map(async (r) => {
        const images = await db
          .select()
          .from(lostImages)
          .where(eq(lostImages.lostId, r.id));
        return { ...r, images };
      })
    );
    return results;
  }

  async getReportById(id: string) {
    const report = await db
      .select()
      .from(lostReports)
      .where(eq(lostReports.id, id))
      .limit(1);
    if (!report.length) return null;
    const images = await db
      .select()
      .from(lostImages)
      .where(eq(lostImages.lostId, id));
    return { ...report[0], images };
  }

  async createReport(userId: string, data: any, imageUrls: string[]) {
    const reportId = uuidv4();
    await db.insert(lostReports).values({
      id: reportId,
      userId,
      name: data.name,
      description: data.description,
      location: data.location,
      lastSeen: data.lastSeen,
      reward: data.reward,
      status: data.status || "searching", // Use status from form (found or searching)
      latitude: data.latitude,
      longitude: data.longitude,
    });

    if (imageUrls.length > 0) {
      await db.insert(lostImages).values(
        imageUrls.map((url) => ({
          id: uuidv4(),
          lostId: reportId,
          imageUrl: url,
        }))
      );
    }
    return this.getReportById(reportId);
  }

  async markAsFound(reportId: string, userId: string) {
    // Verify ownership
    const report = await db
      .select()
      .from(lostReports)
      .where(and(eq(lostReports.id, reportId), eq(lostReports.userId, userId)));
    if (!report.length) throw new Error("Unauthorized or Not Found");

    // Logic: Mark as Found
    await db
      .update(lostReports)
      .set({ status: "found" })
      .where(eq(lostReports.id, reportId));
    return { success: true };
  }

  // Someone else reporting they found the cat
  async submitFoundReport(userId: string, lostId: string, data: any) {
    const reportId = uuidv4();
    await db.insert(foundReports).values({
      id: reportId,
      lostId,
      reporterId: userId,
      message: data.message,
      location: data.location,
    });
    return { id: reportId, success: true };
  }
}
