import { and, eq } from "drizzle-orm";
import { db } from "../../DataBase/db.js";
import { memberships } from "../../DataBase/Schemas/membership.js";

export const membershipRepo = {
  
  async createMembership(executor = db, membershipData) {
    const [newMembership] = await executor
      .insert(memberships)
      .values(membershipData)
      .returning();

    return newMembership;
  },

  
  async findAllByUserAndOrg(
    executor = db,
    userId,
    orgId
  ) {
    const membership = await executor
      .select()
      .from(memberships)
      .where(
        and(
          eq(memberships.userId, userId),
          eq(memberships.organizationId, orgId)
        )
      );

    return membership[0];
  },

  
  async findById(executor = db, id) {
    const membership = await executor
      .select()
      .from(memberships)
      .where(eq(memberships.id, id));

    return membership[0];
  },

  
  async findAllByOrg(executor = db, orgId) {
    const membership = await executor
      .select()
      .from(memberships)
      .where(eq(memberships.organizationId, orgId));

    return membership;
  },

  
  async delete(executor = db, id) {
    const [deletedMembership] = await executor
      .delete(memberships)
      .where(eq(memberships.id, id))
      .returning();

    return deletedMembership;
  },
};