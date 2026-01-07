import { buildServer } from "./server";
import dotenv from "dotenv";

dotenv.config();

const start = async () => {
  const server = await buildServer();
  const PORT = parseInt(process.env.PORT || "3000");

  try {
    await server.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log(`Better Auth URL: ${process.env.BETTER_AUTH_URL}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
