import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  basePath: "/api/auth",
  trustedOrigins: ["*"], // Allow all origins for mobile app
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [],
  advanced: {
    crossSubDomainCookies: {
      enabled: false,
    },
  },
  user: {
    fields: {
      image: "avatarUrl", // Map 'image' to our 'avatarUrl' column
    },
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
      phone: {
        type: "string",
      },
    },
  },
});
