import { FastifyInstance } from "fastify";
import { UserService } from "../services/user.service";
import { saveFile } from "../utils/upload";
import { auth } from "../auth";

const userService = new UserService();

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/me", async (request, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });
    const profile = await userService.getProfile(session.user.id);
    if (!profile) return reply.status(404).send({ message: "User not found" });
    return profile;
  });

  fastify.put("/me", async (request, reply) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return reply.status(401).send({ message: "Unauthorized" });

    const parts = request.parts();
    const data: any = {};
    let avatarUrl: string | null = null;
    let kycUrl: string | null = null;

    for await (const part of parts) {
      if (part.type === "file") {
        const saved = await saveFile(part);
        if (part.fieldname === "avatar") avatarUrl = saved;
        if (part.fieldname === "kyc") kycUrl = saved;
      } else {
        data[part.fieldname] = part.value;
      }
    }

    return await userService.updateProfile(
      session.user.id,
      data,
      avatarUrl || undefined,
      kycUrl || undefined
    );
  });
}
