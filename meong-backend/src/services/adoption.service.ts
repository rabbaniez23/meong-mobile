import { db } from "../db";
import {
  adoptionListings,
  adoptionImages,
  adoptionRequests,
} from "../db/schema";
import { eq, and, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export class AdoptionService {
  // --- LISTINGS ---

  async getAllListings(filters: any) {
    // Basic implementation, can add complex filters later
    const listings = await db
      .select()
      .from(adoptionListings)
      .orderBy(desc(adoptionListings.createdAt));

    // Fetch images for each listing (can be optimized with join)
    const results = await Promise.all(
      listings.map(async (l) => {
        const images = await db
          .select()
          .from(adoptionImages)
          .where(eq(adoptionImages.adoptionId, l.id));
        return { ...l, images };
      })
    );

    return results;
  }

  async getListingById(id: string) {
    const listing = await db
      .select()
      .from(adoptionListings)
      .where(eq(adoptionListings.id, id))
      .limit(1);
    if (!listing.length) return null;

    const images = await db
      .select()
      .from(adoptionImages)
      .where(eq(adoptionImages.adoptionId, id));
    return { ...listing[0], images };
  }

  async createListing(userId: string, data: any, imageUrls: string[]) {
    const listingId = uuidv4();

    await db.insert(adoptionListings).values({
      id: listingId,
      userId,
      name: data.name,
      breed: data.breed,
      age: data.age,
      gender: data.gender,
      location: data.location,
      description: data.description,
      isVaccinated: data.isVaccinated === "true" || data.isVaccinated === true,
      isSterilized: data.isSterilized === "true" || data.isSterilized === true,
      isDewormed: data.isDewormed === "true" || data.isDewormed === true,
      isFleaFree: data.isFleaFree === "true" || data.isFleaFree === true,
    });

    if (imageUrls.length > 0) {
      await db.insert(adoptionImages).values(
        imageUrls.map((url, idx) => ({
          id: uuidv4(),
          adoptionId: listingId,
          imageUrl: url,
          isPrimary: idx === 0,
        }))
      );
    }

    return this.getListingById(listingId);
  }

  async deleteListing(id: string, userId: string) {
    // Check ownership handled in route or here
    await db
      .delete(adoptionListings)
      .where(
        and(eq(adoptionListings.id, id), eq(adoptionListings.userId, userId))
      );
  }

  // --- REQUESTS ---

  async submitRequest(userId: string, adoptionId: string, data: any) {
    const requestId = uuidv4();
    await db.insert(adoptionRequests).values({
      id: requestId,
      adoptionId,
      requesterId: userId,
      message: data.message,
      hasExperience: data.hasExperience,
      hasFence: data.hasFence,
      vaccineCommitment: data.vaccineCommitment,
      isIndoor: data.isIndoor,
      status: "pending",
    });
    return { id: requestId, status: "pending" };
  }

  async getRequestsForListing(listingId: string) {
    return await db
      .select()
      .from(adoptionRequests)
      .where(eq(adoptionRequests.adoptionId, listingId));
  }

  // Get requests I made (my adoption history)
  async getMyRequests(userId: string) {
    const requests = await db
      .select()
      .from(adoptionRequests)
      .where(eq(adoptionRequests.requesterId, userId))
      .orderBy(desc(adoptionRequests.createdAt));

    // Get listing details for each request
    const results = await Promise.all(
      requests.map(async (r) => {
        const listing = await this.getListingById(r.adoptionId);
        return { ...r, listing };
      })
    );
    return results;
  }

  // Get incoming requests for my listings
  async getIncomingRequests(userId: string) {
    // First get all my listings
    const myListings = await db
      .select()
      .from(adoptionListings)
      .where(eq(adoptionListings.userId, userId));

    if (myListings.length === 0) return [];

    // Get all requests for my listings
    const allRequests: any[] = [];
    for (const listing of myListings) {
      const requests = await db
        .select()
        .from(adoptionRequests)
        .where(eq(adoptionRequests.adoptionId, listing.id))
        .orderBy(desc(adoptionRequests.createdAt));

      for (const req of requests) {
        allRequests.push({
          ...req,
          catName: listing.name,
          catImage: null, // Will be populated below
        });
      }
    }

    return allRequests;
  }

  async updateRequestStatus(
    requestId: string,
    status: "approved" | "rejected",
    userId: string
  ) {
    // 1. Get the request
    const req = await db
      .select()
      .from(adoptionRequests)
      .where(eq(adoptionRequests.id, requestId))
      .limit(1);
    if (!req.length) throw new Error("Request not found");

    const adoptionId = req[0].adoptionId;

    // 2. Verify user owns the listing
    const listing = await db
      .select()
      .from(adoptionListings)
      .where(eq(adoptionListings.id, adoptionId))
      .limit(1);
    if (!listing.length) throw new Error("Listing not found");
    if (listing[0].userId !== userId) throw new Error("Unauthorized");

    // 3. Update Status
    await db
      .update(adoptionRequests)
      .set({ status })
      .where(eq(adoptionRequests.id, requestId));

    // 4. BUSINESS LOGIC: If Approved -> Mark Listing as Adopted & Reject others?
    // User request: "nnti bakal adop atau tidak diadopsi oleh orang lain lagi"
    if (status === "approved") {
      // Set Listing Status to 'adopted'
      await db
        .update(adoptionListings)
        .set({ status: "adopted" })
        .where(eq(adoptionListings.id, adoptionId));

      // Optional: Auto-reject other pending requests for this listing?
      // Let's do it to be clean
      await db
        .update(adoptionRequests)
        .set({ status: "rejected" })
        .where(
          and(
            eq(adoptionRequests.adoptionId, adoptionId),
            eq(adoptionRequests.status, "pending")
            // ne(adoptionRequests.id, requestId) // Not strictly needed as we just updated current to approved
          )
        );
    }

    return { success: true };
  }
}
