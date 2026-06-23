import { blacklistedTokens } from "../../../data/blacklistedTokens.js";
import { refreshTokens } from "../../../data/refreshTokens.js";
import { tokenrepo } from "../../../Repositores/token.repository.js";

export const logOutService = (refreshToken) => {
  if (!refreshToken) {
    return {
      success: false,
      statusCode: 401,
      message: "refreshToken not here",
    };
  }

  const tokenexists = tokenrepo.checkExists(refreshToken);

  if (tokenexists) {
    tokenrepo.blacklist(refreshToken);

    tokenrepo.removeToken(refreshToken);
  }

  return {
    success: true,
    message: "logged out successfully",
  };
};
