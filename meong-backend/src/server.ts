import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";
import { auth } from "./auth";
import { toNodeHandler } from "better-auth/node";

// Routes Import
import { adoptionRoutes } from "./routes/adoption.routes";
import { lostRoutes } from "./routes/lost.routes";
import { donationRoutes } from "./routes/donation.routes";
import { communityRoutes } from "./routes/community.routes";
import { chatRoutes } from "./routes/chat.routes";
import { notificationRoutes } from "./routes/notification.routes";
import { userRoutes } from "./routes/user.routes";

export const buildServer = async () => {
  const fastify = Fastify({
    logger: true,
  });

  // 1. Plugins
  await fastify.register(cors, {
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  });

  await fastify.register(multipart);

  // Serve static files (uploads)
  await fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), "uploads"),
    prefix: "/uploads/",
  });

  // 2. Health Check
  fastify.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  // 3. Auth Handler - Wrap in promise to wait for response
  const authHandler = toNodeHandler(auth);

  fastify.addHook("onRequest", async (request, reply) => {
    if (request.url.startsWith("/api/auth")) {
      console.log("Auth request:", request.method, request.url);

      // Create a promise that resolves when response ends
      await new Promise<void>((resolve, reject) => {
        const res = reply.raw;

        // Listen for response to finish
        res.on("finish", () => {
          console.log("Auth response finished");
          resolve();
        });

        res.on("error", (err) => {
          console.error("Response error:", err);
          reject(err);
        });

        // Call the auth handler
        authHandler(request.raw, res).catch((err: any) => {
          console.error("Auth handler error:", err);
          reject(err);
        });
      });

      // Hijack after response is done
      reply.hijack();
    }
  });

  // 4. API Routes
  await fastify.register(adoptionRoutes, { prefix: "/api/adoptions" });
  await fastify.register(lostRoutes, { prefix: "/api/lost" });
  await fastify.register(donationRoutes, { prefix: "/api/donations" });
  await fastify.register(communityRoutes, { prefix: "/api/community" });
  await fastify.register(chatRoutes, { prefix: "/api/chat" });
  await fastify.register(notificationRoutes, { prefix: "/api/notifications" });
  await fastify.register(userRoutes, { prefix: "/api/users" });

  return fastify;
};
