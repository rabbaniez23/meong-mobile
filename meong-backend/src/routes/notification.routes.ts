import { FastifyInstance } from "fastify";
import { NotificationService } from "../services/notification.service";
import { auth } from "../auth";

const notificationService = new NotificationService();

export async function notificationRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    return await notificationService.getNotifications(session.user.id);
  });

  fastify.put("/:id/read", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    return await notificationService.markRead(request.params.id);
  });
}
