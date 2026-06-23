import { refreshTokens } from "../../../data/refreshTokens.js";
import { tokenrepo } from "../../../Repositores/token.repository.js";
import { verifyRefreshTokens } from "../../../shared/security/verifyRefreshToken.js";
import { generateAccessToken, generateRefreshToken } from "../../../shared/utils/jwt.js";

export const refreshService = (refreshToken ) => {
  if (!refreshToken) {
    return {
      success: false,
      statusCode: 401,
      message: "refreshToken not here",
    };
  }

  const tokenExists = tokenrepo.checkExists(refreshToken);

  if (!tokenExists) {
    return {
      success: false,
      statusCode: 403,
      message: "Invalid token",
    };
  }


  const BlackListed = tokenrepo.isBlcklisted(
    refreshToken
  );

  if(BlackListed) {
    return {
      success : false,
      statusCode : 401,
      message : "refreshToken Blacklisted",
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
  const newRefreshToken = generateRefreshToken(payload);

  tokenrepo.saveRefreshToken(newRefreshToken);

  return {
    success: true,
    statusCode : 200,
    accessToken: newAccessToken,
    refreshToken : newRefreshToken,
    message : "Token refreshed Successfully",
  };
};