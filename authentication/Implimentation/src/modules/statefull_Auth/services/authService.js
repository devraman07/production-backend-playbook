import { users } from "../../../database/users.js";
import { hashpassword } from "../../../shared/security/hashPassword.js";
import { simulateDelay } from "../../../shared/security/simulatedelay.js";
import { ROLES } from "../../../shared/constants/roles.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const registerUser = async ({ email, name, password }) => {
  await simulateDelay();

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return {
      success: false,
      message: "Authentication failed",
    };
  }

  const hashedPassword = await hashpassword(password);

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword,
    role: ROLES.USER,
    failedLoginAttempts: 0,
    lockUntil: null,
    createdAt: new Date(),
  };

  users.push(newUser);

  return {
    success: true,
    user: newUser,
  };
};

export const loginUser = async ({ email, password }) => {
  await simulateDelay();

  const user = users.find((u) => u.email === email);

  if (!user) {
    return {
      success: false,
      message: "Authentication failed",
    };
  }

  if (user.lockUntil && user.lockUntil > Date.now()) {
    return {
      success: false,
      message: "Account temporarily locked",
    };
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    user.failedLoginAttempts += 1;

    /*
    Lock account after 5 tries
    */
    if (user.failedLoginAttempts >= 5) {
      user.lockUntil = Date.now() + 15 * 60 * 1000;
    }

    return {
      success: false,
      message: "Authentication failed",
    };
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = null;

  return {
    success: true,
    user,
  };
};
