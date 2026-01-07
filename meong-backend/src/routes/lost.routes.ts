import { FastifyInstance } from "fastify";
import { LostService } from "../services/lost.service";
import { saveFile } from "../utils/upload";
import { auth } from "../auth";

const lostService = new LostService();

export async function lostRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return await lostService.getAllReports(request.query);
  });

  fastify.post("/", async (request, reply) => {
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

    return await lostService.createReport(session.user.id, data, imageUrls);
  });

  fastify.put("/:id/found", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    try {
      return await lostService.markAsFound(request.params.id, session.user.id);
    } catch (e) {
      return reply.status(403).send({ message: "Failed to update status" });
    }
  });

  // Submit 'I found this cat' report
  fastify.post("/:id/report", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    return await lostService.submitFoundReport(
      session.user.id,
      request.params.id,
      request.body
    );
  });
}
