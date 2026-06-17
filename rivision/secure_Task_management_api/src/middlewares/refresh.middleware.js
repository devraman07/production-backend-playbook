import jwt from "jsonwebtoken";
import { blacklistedTokens } from "../data/blacklistedTokens.js";

export const refreshMiddleware = (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token missing",
      });
    }

    const tokenExists = blacklistedTokens.includes(refreshToken);

    if (!tokenExists) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};
