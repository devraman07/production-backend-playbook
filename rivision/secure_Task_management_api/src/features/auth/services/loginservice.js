import { tokenrepo } from "../../../Repositores/token.repository.js";
import { userrepo } from "../../../Repositores/User.repository.js";
import { comparePassword } from "../../../shared/utils/comparePassword.js";
import { generateAccessToken, generateRefreshToken } from "../../../shared/utils/jwt.js";

export const loginService = async ({ email, password }) => {
  const user = userrepo.findByEmail(email);
  if (!user) {
    return {
      success: false,
      statusCode : 404,
      message: "User not found",
    };
  }

  const correctpassword = await comparePassword(password, user.password);

  if (!correctpassword) {
    return {
      success: false,
      status : 401,
      message: "wrong password",
    };
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  tokenrepo.saveRefreshToken(refreshToken);

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  

  return {
    success: true,
    statusCode : 200,
    message : "User Login successfull",
    user: safeUser,
    sessionUser : safeUser,
    accessToken : accessToken,
    refreshToken : refreshToken,
  };
};
