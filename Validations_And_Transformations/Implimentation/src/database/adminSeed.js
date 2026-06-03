import { users } from "../database/users.js";
import { ROLES } from "../shared/constants/roles.js";

const adminExists = users.some(
  (u) => u.email === "admin@example.com" && u.role === ROLES.ADMIN,
);

if (!adminExists) {
  users.push({
    id: "admin-1",
    name: "System Admin",
    email: "admin@test.com",
    password: "Admin123@",
    age: 30,
    role: ROLES.ADMIN,
    createdAt: new Date(),
  });
}
