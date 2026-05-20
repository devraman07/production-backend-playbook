import bcrypt from "bcrypt";
import crypto from "crypto";

import { users } from "../../../database/users.js";
import { refreshTokens } from "../../../database/refreshTokens.js";
import { passowrdResetTokens } from "../../../database/passowrdTokenReset.js";

import { ROLES } from "../../../shared/constants/roles.js";
import { hashpassword } from "../../../shared/security/hashPassword.js";
import { simulateDelay } from "../../../shared/security/simulatedelay.js";
import { generateResetTokens } from "../../../shared/security/generateResetTokens.js";

export const signupUser = async ({ name, email, password }) => {
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
    createdAt: Date.now(),
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

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      success: false,
      message: "Authentication failed",
    };
  }

  return {
    success: true,
    user,
  };
};

export const resetPass = async ({ email }) => {
  console.log("service hit");

  await simulateDelay();

  const user = users.find((u) => u.email === email);

  console.log(user);

  if (!user) {
    return {
      success: true,
    };
  }

  const resetToken = generateResetTokens();

  console.log(resetToken);

  /*
  Remove old token
  One active token per user
  */
  const existingIndex = passowrdResetTokens.findIndex(
    (t) => t.userId === user.id,
  );

  if (existingIndex !== -1) {
    passowrdResetTokens.splice(existingIndex, 1);
  }

  passowrdResetTokens.push({
    token: resetToken,
    userId: user.id,
    expiresAt: Date.now() + 15 * 60 * 1000,
  });

  console.log(`
Reset Link:

http://localhost:5000/reset-password?token=${resetToken}
`);

  return {
    success: true,
  };
};

export const passreset = async ({ token, newPassword }) => {
  await simulateDelay();

  const storedToken = passowrdResetTokens.find((t) => t.token === token);

  if (!storedToken) {
    return {
      success: false,
      message: "Invalid or expired token",
    };
  }

  if (storedToken.expiresAt < Date.now()) {
    return {
      success: false,
      message: "Invalid or expired token",
    };
  }

  const user = users.find((u) => u.id === storedToken.userId);

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const hashedPassword = await hashpassword(newPassword);

  user.password = hashedPassword;

  const tokenIndex = passowrdResetTokens.findIndex((t) => t.token === token);

  passowrdResetTokens.splice(tokenIndex, 1);

  return {
    success: true,
    message: "Password reset successful",
  };
};
