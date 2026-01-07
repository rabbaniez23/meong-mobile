import { FastifyInstance } from "fastify";
import { CommunityService } from "../services/community.service";
import { saveFile } from "../utils/upload";
import { auth } from "../auth";

const communityService = new CommunityService();

export async function communityRoutes(fastify: FastifyInstance) {
  // --- POSTS ---
  fastify.get("/posts", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    // For public feed, we might allow no session, but for isLiked check we need it.
    // If no session, pass a dummy or keep it null and handle in service?
    // Service expects string. Let's enforce auth for now since it's a community app.
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    return await communityService.getPosts(
      session.user.id,
      request.query.category
    );
  });

  fastify.post("/posts", async (request, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    const parts = request.parts();
    const data: any = {};
    let imageUrl: string | null = null;

    for await (const part of parts) {
      if (part.type === "file") {
        imageUrl = await saveFile(part);
      } else {
        data[part.fieldname] = part.value;
      }
    }
    return await communityService.createPost(session.user.id, data, imageUrl);
  });

  fastify.get("/posts/:id/comments", async (request: any, reply) => {
    return await communityService.getComments(request.params.id);
  });

  fastify.post("/posts/:id/comments", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    return await communityService.addComment(
      session.user.id,
      request.params.id,
      request.body.content
    );
  });

  fastify.post("/posts/:id/like", async (request: any, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    return await communityService.likePost(session.user.id, request.params.id);
  });

  // --- STORIES ---
  fastify.get("/stories", async (request, reply) => {
    return await communityService.getStories();
  });

  fastify.post("/stories", async (request, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    const parts = request.parts();
    const data: any = {};
    let imageUrl: string | null = null;

    for await (const part of parts) {
      if (part.type === "file") {
        imageUrl = await saveFile(part);
      } else {
        data[part.fieldname] = part.value;
      }
    }
    return await communityService.createStory(session.user.id, data, imageUrl);
  });
}
