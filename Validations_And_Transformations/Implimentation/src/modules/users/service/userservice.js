import crypto from "crypto";

import { users } from "../../../database/users.js";

export const registerUser = ({ name, email, password, age }) => {
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return {
      success: false,
      message: "email already exists",
    };
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    password: password,
    age: age,
    createdAt: new Date(),
  };

  users.push(newUser);

  return {
    success: true,
    user: newUser,
  };
};

export const loginUser = ({ email, password }) => {
  const user = users.find((u) => u.email === email);

  console.log("service hit");

  console.log("incoming email:", email);
  console.log("incoming password:", password);

  console.log("all users:", users);

  if (!user) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  return {
    success: true,
    user,
  };
};
