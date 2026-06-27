import { pgTable, uuid, varchar, timestamp, unique } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const organizations = pgTable(
  "organizations",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),

    name: varchar("name", {
      length: 255,
    }).notNull(),

    createdBy: uuid("created_by")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueOrgPerUser: unique().on(
      table.createdBy,
      table.name
    ),
  })
);