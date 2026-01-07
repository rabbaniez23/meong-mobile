import { db } from "../db";
import { donationCampaigns, donations } from "../db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export class DonationService {
  async getCampaigns(type?: "Shelter" | "Rumah Sakit") {
    // Check if empty, if so, seed
    const countResult = await db
      .select({ count: sql`count(*)` })
      .from(donationCampaigns);
    const count = Number(countResult[0].count);

    if (count === 0) {
      await this.seedCampaigns();
    }

    let query = db
      .select()
      .from(donationCampaigns)
      .orderBy(desc(donationCampaigns.createdAt));
    if (type) {
      query = query.where(eq(donationCampaigns.type, type)) as any;
    }
    return await query;
  }

  async getCampaignById(id: string) {
    const campaign = await db
      .select()
      .from(donationCampaigns)
      .where(eq(donationCampaigns.id, id));
    return campaign[0];
  }

  async createDonation(userId: string | null, data: any) {
    const donationId = uuidv4();

    await db.insert(donations).values({
      id: donationId,
      campaignId: data.campaignId,
      donorId: userId,
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      isAnonymous: data.isAnonymous,
      status: "success",
    });

    // Update collected amount
    await db
      .update(donationCampaigns)
      .set({
        collectedAmount: sql`${donationCampaigns.collectedAmount} + ${data.amount}`,
      })
      .where(eq(donationCampaigns.id, data.campaignId));

    return { success: true, donationId };
  }

  // Seed initial campaigns if empty
  async seedCampaigns() {
    const campaigns = [
      {
        type: "Shelter",
        name: "Rumah Kucing Bandung",
        location: "Lembang, Bandung",
        imageUrl: "shelter1.jpg",
        collectedAmount: 0,
        targetAmount: 50000000,
        description:
          "Tempat penampungan bagi 50+ kucing jalanan yang sakit dan terlantar. Kami membutuhkan bantuan untuk renovasi atap yang bocor.",
      },
      {
        type: "Rumah Sakit",
        name: "Klinik Hewan Sejahtera",
        location: "Tebet, Jakarta",
        imageUrl: "rs1.jpg",
        collectedAmount: 0,
        targetAmount: 10000000,
        description:
          "Program sterilisasi gratis untuk kucing liar di sekitar Jakarta Selatan. Bantu kami mengontrol populasi kucing jalanan.",
      },
      {
        type: "Shelter",
        name: "Pondok Meong",
        location: "Sleman, Yogyakarta",
        imageUrl: "shelter2.jpg",
        collectedAmount: 0,
        targetAmount: 20000000,
        description:
          "Kebutuhan mendesak untuk stok makanan (dry food & wet food) dan pasir kucing untuk 2 bulan ke depan.",
      },
      {
        type: "Rumah Sakit",
        name: "RS Hewan Pendidikan",
        location: "Bogor",
        imageUrl: "rs2.jpg",
        collectedAmount: 0,
        targetAmount: 50000000,
        description:
          'Penggalangan dana untuk operasi kaki kucing "Si Belang" yang tertabrak motor minggu lalu.',
      },
    ];

    for (const c of campaigns) {
      await db.insert(donationCampaigns).values({
        id: uuidv4(),
        type: c.type as any,
        name: c.name,
        location: c.location,
        imageUrl: c.imageUrl,
        targetAmount: c.targetAmount,
        collectedAmount: c.collectedAmount,
        description: c.description,
        isActive: true,
      });
    }
  }
}
