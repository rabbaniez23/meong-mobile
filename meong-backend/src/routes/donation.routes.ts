import { FastifyInstance } from "fastify";
import { DonationService } from "../services/donation.service";
import { auth } from "../auth";

const donationService = new DonationService();

export async function donationRoutes(fastify: FastifyInstance) {
  fastify.get("/campaigns", async (request: any, reply) => {
    return await donationService.getCampaigns(request.query.type);
  });

  fastify.get("/campaigns/:id", async (request: any, reply) => {
    return await donationService.getCampaignById(request.params.id);
  });

  fastify.post("/", async (request: any, reply) => {
    // Optional Auth: User can donate as guest, but better if logged in.
    // For meong-mobile, usually user is logged in.
    let userId = null;
    try {
      const session = await auth.api.getSession({ headers: request.headers });
      if (session) userId = session.user.id;
    } catch (e) {}

    return await donationService.createDonation(userId, request.body);
  });
}
