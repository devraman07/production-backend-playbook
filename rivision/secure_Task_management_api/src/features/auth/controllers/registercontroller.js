import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt.js";
import { registerService } from "../services/registerService.js";

export const registerController = (req, res) => {
  try {
    const result = registerService(req.body);

    if (!result.success) {
      return res.status(409).json({
        success: false,
        error: result.message,
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

    const refreshToken = generateRefreshToken(payload);

    const accessToken = generateAccessToken(payload);

    const safeUser = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successsfully",
      user: safeUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in controller layer",
    });
  }
};
