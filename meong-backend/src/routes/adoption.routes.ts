import { FastifyInstance } from "fastify";
import { AdoptionService } from "../services/adoption.service";
import { saveFile } from "../utils/upload";
import { auth } from "../auth";

const adoptionService = new AdoptionService();

export async function adoptionRoutes(fastify: FastifyInstance) {
  // Get all listings
  fastify.get("/", async (request, reply) => {
    return await adoptionService.getAllListings(request.query);
  });

  // Create listing (Multipart)
  fastify.post("/", async (request, reply) => {
    // Auth Check
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    const parts = request.parts();
    const data: any = {};
    const imageUrls: string[] = [];

    for await (const part of parts) {
      if (part.type === "file") {
        const url = await saveFile(part);
        imageUrls.push(url);
      } else {
        data[part.fieldname] = part.value;
      }
    }

    return await adoptionService.createListing(
      session.user.id,
      data,
      imageUrls
    );
  });

  // Get single listing
  fastify.get("/:id", async (request: any, reply) => {
    return await adoptionService.getListingById(request.params.id);
  });

  // Submit Adoption Request
  fastify.post("/:id/request", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    return await adoptionService.submitRequest(
      session.user.id,
      request.params.id,
      request.body
    );
  });

  // Get my adoption requests (history of requests I made)
  fastify.get("/my-requests", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    return await adoptionService.getMyRequests(session.user.id);
  });

  // Get incoming requests for my listings
  fastify.get("/incoming-requests", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    return await adoptionService.getIncomingRequests(session.user.id);
  });

  // Approve/Reject Request
  fastify.put("/requests/:id", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    const { status } = request.body as any; // 'approved' or 'rejected'
    return await adoptionService.updateRequestStatus(
      request.params.id,
      status,
      session.user.id
    );
  });
}
