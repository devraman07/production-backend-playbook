import { refreshTokens } from "../../../data/refreshTokens.js";
import { verifyRefreshTokens } from "../../../shared/security/verifyRefreshToken.js";
import { generateAccessToken } from "../../../shared/utils/jwt.js";

export const refreshService = (refreshToken ) => {
  if (!refreshToken) {
    return {
      success: false,
      statusCode: 401,
      message: "refreshToken not here",
    };
  }

  const tokenExists = refreshTokens.includes(refreshToken);

  if (!tokenExists) {
    return {
      success: false,
      statusCode: 403,
      message: "Invalid token",
    };
  }

  const decoded = verifyRefreshTokens(refreshToken); 



  const payload = {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
  };

  const newAccessToken = generateAccessToken(payload);

  return {
    success: true,
    accessToken: newAccessToken,
  };
};