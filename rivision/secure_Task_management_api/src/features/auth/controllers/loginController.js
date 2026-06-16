import { refreshTokens } from "../../../data/refreshTokens.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt.js";
import { loginService } from "../services/loginservice.js";

export const loginController = async (req, res) => {
  try {
    
    const result = await loginService(req.body);


    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    req.session.user = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    };

    const payload = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

   refreshTokens.push(refreshToken);

    const safeUser = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    };

    return res.status(200).json({
      success: true,
      user: safeUser,
      message: "Login successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      data: null,
      error: error.message,
      message: "Internal server error in the controller layer",
    });
  }
};
