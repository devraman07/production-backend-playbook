import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { users } from "./users.js";

export const organizations = pgTable("organizations", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),

  name: varchar("name", {
    length: 255,
  }).notNull(),

  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id, {
      onDelete: "restrict",
    }),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});