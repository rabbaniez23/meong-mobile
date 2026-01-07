import { FastifyInstance } from "fastify";
import { ChatService } from "../services/chat.service";
import { auth } from "../auth";

const chatService = new ChatService();

export async function chatRoutes(fastify: FastifyInstance) {
  fastify.get("/rooms", async (request, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    return await chatService.getRooms(session.user.id);
  });

  fastify.post("/rooms", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    return await chatService.initiateChat(
      session.user.id,
      request.body.targetUserId,
      request.body.context
    );
  });

  fastify.get("/rooms/:id/messages", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    return await chatService.getRoomMessages(
      request.params.id,
      session.user.id
    );
  });

  fastify.post("/rooms/:id/messages", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    return await chatService.sendMessage(
      session.user.id,
      request.params.id,
      request.body.content
    );
  });
}
