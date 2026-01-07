import { db } from "./db";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Restoring missing tables...");

  try {
    // 1. Create Accounts Table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS accounts (
        id varchar(36) PRIMARY KEY,
        user_id varchar(36) NOT NULL,
        account_id varchar(255) NOT NULL,
        provider_id varchar(255) NOT NULL,
        access_token text,
        refresh_token text,
        expires_at timestamp,
        password text,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);
    console.log("Checked/Created 'accounts' table.");

    // 2. Create Verifications Table (Verification Tokens)
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS verifications (
         id varchar(36) PRIMARY KEY,
         identifier varchar(255) NOT NULL,
         value text NOT NULL,
         expires_at timestamp NOT NULL,
         created_at timestamp DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
    console.log("Checked/Created 'verifications' table.");

    // 3. Create Sessions Table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id varchar(36) PRIMARY KEY,
        user_id varchar(36) NOT NULL,
        token varchar(255) NOT NULL,
        expires_at timestamp NOT NULL,
        ip_address varchar(45),
        user_agent text,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);
    console.log("Checked/Created 'sessions' table.");

    console.log("Database restoration complete!");
    process.exit(0);
  } catch (error) {
    console.error("Restoration failed:", error);
    process.exit(1);
  }
}

main();
