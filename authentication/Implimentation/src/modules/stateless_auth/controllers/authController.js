import { validationResult } from "express-validator";
import {
  loginUser,
  passreset,
  resetPass,
  signupUser,
} from "../services/authServices.js";

import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { blacklistedTokens } from "../../../database/blacklistedTokens.js";
import { refreshTokens } from "../../../database/refreshtokens.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const result = await signupUser(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const result = await loginUser(req.body);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    const payload = {
      id: result.user.id,
      email: result.user.email,
      role: result.user.role,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    refreshTokens.push(refreshToken);

    return res.status(200).json({
      success: true,
      message: "user logged In successfully",
      accessToken,
      refreshToken,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const profile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const authheader = req.headers.authorization;

    const token = authheader?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }

    blacklistedTokens.push(token);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const refreshtoken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "refreshToken required",
      });
    }

    const tokenExists = refreshTokens.includes(refreshToken);

    if (!tokenExists) {
      return res.status(403).json({
        success: false,
        message: "invalid refresh Token",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const idx = refreshTokens.indexOf(refreshToken);

    refreshTokens.splice(idx, 1);

    const payload = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    const newAccessToken = generateAccessToken(payload);

    const newRefresToken = generateRefreshToken(payload);

    refreshTokens.push(newRefresToken);
    return res.status(200).json({
      success: true,

      accessToken: newAccessToken,

      refreshToken: newRefresToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(403).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

export const passowrdReset = async (req, res) => {
  try {
    await resetPass(req.body);

    return res.status(200).json({
      success: true,
      message: "If account exists, reset link sent",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const passHandler = async (req, res) => {
  try {
    const result = await passreset(req.body);

    if (!result.success) {
      return res.status(200).json({
        success: true,
        message: result.error,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
