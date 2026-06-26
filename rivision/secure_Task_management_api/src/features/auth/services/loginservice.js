import { tokenrepo } from "../../../Repositores/token.repository.js";
import { userrepo } from "../../../Repositores/User.repository.js";
import { comparePassword } from "../../../shared/utils/comparePassword.js";
import { generateHashedpassword } from "../../../shared/utils/hashedPassword.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt.js";

export const loginService = async ({ email, password }) => {
  const user = await userrepo.findByEmail(email);

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  const correctPassword = await comparePassword(
    password,
    user.passwordHash
  );

  if (!correctPassword) {
    return {
      success: false,
      statusCode: 401,
      message: "Wrong password",
    };
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // hash refresh token before saving
  const hashedRefreshToken =
    await generateHashedpassword(refreshToken);

  await tokenrepo.saveRefreshToken({
    userId: user.id,
    tokenHash: hashedRefreshToken,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
  });

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return {
    success: true,
    statusCode: 200,
    message: "User login successful",
    user: safeUser,
    accessToken,
    refreshToken,
  };
};