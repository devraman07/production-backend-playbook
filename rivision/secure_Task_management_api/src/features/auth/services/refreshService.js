import { tokenrepo } from "../../../Repositores/token.repository.js";
import { comparePassword } from "../../../shared/utils/comparePassword.js";
import { generateHashedpassword } from "../../../shared/utils/hashedPassword.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt.js";

export const refreshService = async (
  refreshToken,
  refreshUser
) => {
  if (!refreshToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Refresh token missing",
    };
  }

  // get all active tokens of user
  const activeTokens = await tokenrepo.findAllActiveTokens(
    refreshUser.id
  );

  let matchedToken = null;

  // compare raw token against hashed tokens
  for (const token of activeTokens) {
    const isMatch = await comparePassword(
      refreshToken,
      token.tokenHash
    );

    if (isMatch) {
      matchedToken = token;
      break;
    }
  }

  if (!matchedToken) {
    return {
      success: false,
      statusCode: 403,
      message: "Session not found",
    };
  }

  // revoke old token
  await tokenrepo.revokedTokens(matchedToken.id);

  const payload = {
    id: refreshUser.id,
    name: refreshUser.name,
    email: refreshUser.email,
  };

  // generate new tokens
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // hash new refresh token
  const hashedRefreshToken =
    await generateHashedpassword(newRefreshToken);

  // save rotated token
  await tokenrepo.saveRefreshToken({
    userId: refreshUser.id,
    tokenHash: hashedRefreshToken,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
  });

  return {
    success: true,
    statusCode: 200,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    message: "Token refreshed successfully",
  };
};