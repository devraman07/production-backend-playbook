import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  unique,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { organizations } from "./organizations.js";
import { memberships } from "./membership.js";

export const projectStatusEnum = pgEnum("project_status", [
  "ACTIVE",
  "ARCHIVED",
]);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),

    name: varchar("name", {
      length: 255,
    }).notNull(),

    description: text("description"),

    managerId: uuid("manager_id")
      .references(() => memberships.id, {
        onDelete: "restrict",
      }),

    status: projectStatusEnum("status")
      .default("ACTIVE")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueProjectName: unique().on(
      table.organizationId,
      table.name
    ),
  })
);