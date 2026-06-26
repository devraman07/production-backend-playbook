import { tokenrepo } from "../../../Repositores/token.repository.js";
import { verifyRefreshTokens } from "../../../shared/security/verifyRefreshToken.js";

export const logOutService = async (refreshToken) => {
  if (!refreshToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Refresh token missing",
    };
  }

  const validToken = verifyRefreshTokens(refreshToken);

  if (!validToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Unverified refresh token",
    };
  }

  await tokenrepo.revokeAllUserToken(validToken.id);

  return {
    success: true,
    statusCode: 200,
    message: "Logged out successfully",
  };
};