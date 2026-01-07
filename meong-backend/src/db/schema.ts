import {
  mysqlTable,
  varchar,
  text,
  boolean,
  timestamp,
  int,
  mysqlEnum,
  decimal,
  unique,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

// 1. Users Table
export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  passwordHash: varchar("password_hash", { length: 255 }),
  avatarUrl: varchar("avatar_url", { length: 500 }),
  role: mysqlEnum("role", ["user", "admin", "shelter"]).default("user"),
  job: varchar("job", { length: 255 }),
  age: int("age"),
  location: varchar("location", { length: 255 }),
  motivation: text("motivation"),
  isVerified: boolean("is_verified").default(false),
  kycImageUrl: varchar("kyc_image_url", { length: 500 }),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 2. Sessions (Better Auth)
export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 3. Accounts (Better Auth - for OAuth if needed later, simplified for now to standard fields)
export const accounts = mysqlTable("accounts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 4. Verifications (Better Auth)
export const verifications = mysqlTable("verifications", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 5. Adoption Listings
export const adoptionListings = mysqlTable("adoption_listings", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  breed: varchar("breed", { length: 100 }),
  age: varchar("age", { length: 50 }),
  gender: mysqlEnum("gender", ["Jantan", "Betina"]).notNull(),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  status: mysqlEnum("status", ["available", "pending", "adopted"]).default(
    "available"
  ),
  isVaccinated: boolean("is_vaccinated").default(false),
  isSterilized: boolean("is_sterilized").default(false),
  isDewormed: boolean("is_dewormed").default(false),
  isFleaFree: boolean("is_flea_free").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 6. Adoption Images
export const adoptionImages = mysqlTable("adoption_images", {
  id: varchar("id", { length: 36 }).primaryKey(),
  adoptionId: varchar("adoption_id", { length: 36 })
    .notNull()
    .references(() => adoptionListings.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  isPrimary: boolean("is_primary").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// 7. Adoption Requests
export const adoptionRequests = mysqlTable("adoption_requests", {
  id: varchar("id", { length: 36 }).primaryKey(),
  adoptionId: varchar("adoption_id", { length: 36 })
    .notNull()
    .references(() => adoptionListings.id, { onDelete: "cascade" }),
  requesterId: varchar("requester_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default(
    "pending"
  ),
  hasExperience: boolean("has_experience").default(false),
  hasFence: boolean("has_fence").default(false),
  vaccineCommitment: boolean("vaccine_commitment").default(false),
  isIndoor: boolean("is_indoor").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 8. Lost Reports
export const lostReports = mysqlTable("lost_reports", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  lastSeen: varchar("last_seen", { length: 255 }),
  reward: varchar("reward", { length: 100 }),
  status: mysqlEnum("status", ["searching", "found"]).default("searching"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 9. Lost Images
export const lostImages = mysqlTable("lost_images", {
  id: varchar("id", { length: 36 }).primaryKey(),
  lostId: varchar("lost_id", { length: 36 })
    .notNull()
    .references(() => lostReports.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 10. Found Reports
export const foundReports = mysqlTable("found_reports", {
  id: varchar("id", { length: 36 }).primaryKey(),
  lostId: varchar("lost_id", { length: 36 })
    .notNull()
    .references(() => lostReports.id, { onDelete: "cascade" }),
  reporterId: varchar("reporter_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  message: text("message"),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// 11. Donation Campaigns
export const donationCampaigns = mysqlTable("donation_campaigns", {
  id: varchar("id", { length: 36 }).primaryKey(),
  type: mysqlEnum("type", ["Shelter", "Rumah Sakit"]).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  targetAmount: int("target_amount").notNull(),
  collectedAmount: int("collected_amount").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 12. Donations
export const donations = mysqlTable("donations", {
  id: varchar("id", { length: 36 }).primaryKey(),
  campaignId: varchar("campaign_id", { length: 36 })
    .notNull()
    .references(() => donationCampaigns.id, { onDelete: "cascade" }),
  donorId: varchar("donor_id", { length: 36 }).references(() => users.id, {
    onDelete: "set null",
  }),
  donorName: varchar("donor_name", { length: 255 }),
  donorEmail: varchar("donor_email", { length: 255 }),
  amount: int("amount").notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }),
  isAnonymous: boolean("is_anonymous").default(false),
  status: mysqlEnum("status", ["pending", "success", "failed"]).default(
    "pending"
  ),
  createdAt: timestamp("created_at").defaultNow(),
});

// 13. Community Posts
export const communityPosts = mysqlTable("community_posts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  category: mysqlEnum("category", [
    "Kesehatan",
    "Event",
    "Diskusi",
    "Trending",
  ]).notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  likesCount: int("likes_count").default(0),
  commentsCount: int("comments_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// 14. Comments
export const comments = mysqlTable("comments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  postId: varchar("post_id", { length: 36 })
    .notNull()
    .references(() => communityPosts.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 15. Likes
export const likes = mysqlTable(
  "likes",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    postId: varchar("post_id", { length: 36 })
      .notNull()
      .references(() => communityPosts.id, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    uniqueLike: unique("unique_like").on(t.postId, t.userId),
  })
);

// 16. Stories
export const stories = mysqlTable("stories", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: mysqlEnum("type", ["image", "text"]).notNull(),
  content: text("content"),
  imageUrl: varchar("image_url", { length: 500 }),
  backgroundColor: varchar("background_color", { length: 20 }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 17. Chat Rooms
export const chatRooms = mysqlTable("chat_rooms", {
  id: varchar("id", { length: 36 }).primaryKey(),
  user1Id: varchar("user1_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  user2Id: varchar("user2_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  context: varchar("context", { length: 255 }),
  lastMessageAt: timestamp("last_message_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 18. Messages
export const messages = mysqlTable("messages", {
  id: varchar("id", { length: 36 }).primaryKey(),
  roomId: varchar("room_id", { length: 36 })
    .notNull()
    .references(() => chatRooms.id, { onDelete: "cascade" }),
  senderId: varchar("sender_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// 19. Notifications
export const notifications = mysqlTable("notifications", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: mysqlEnum("type", [
    "ADOPTION",
    "LOST",
    "COMMUNITY",
    "DONATION",
    "SYSTEM",
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  imageUrl: varchar("image_url", { length: 500 }),
  actionUrl: varchar("action_url", { length: 500 }),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
