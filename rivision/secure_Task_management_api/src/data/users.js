import { ROLES } from "./roles.js";


export const users = [
  {
    id: 1,
    name: "Admin Raman",
    email: "admin@test.com",
    password: "$2a$10$XWzH8J7vKj4bL7WwM6YB2uT4f2nq8y5K3m1A9eP6fR7tS8vN0yLQa", 
    role: ROLES.ADMIN
  },
  {
    id: 2,
    name: "Manager Arjun",
    email: "manager@test.com",
    password: "$2a$10$XWzH8J7vKj4bL7WwM6YB2uT4f2nq8y5K3m1A9eP6fR7tS8vN0yLQa",
    role: ROLES.MANAGER
  },
  {
    id: 3,
    name: "Member Rahul",
    email: "member@test.com",
    password: "$2a$10$XWzH8J7vKj4bL7WwM6YB2uT4f2nq8y5K3m1A9eP6fR7tS8vN0yLQa",
    role: ROLES.MEMBER
  }
];