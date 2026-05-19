import { validationResult } from "express-validator";
import { loginUser, signupUser } from "../services/authservice.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../stateless_auth/utils/jwt.js";
import { blacklistedTokens } from "../../../database/blacklistedTokens.js";

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

    //create session

    req.session.user = {
      id: result.user.id,
      email: result.user.email,
      role: result.user.role,
    };

    const payload = {
      id: result.user.id,
      email: result.user.email,
      role: result.user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",

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

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const result = await loginUser(req.body);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    //fixing session
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      //create session
      req.session.user = {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
      };

      //jwt payload

      const payload = {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
      };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      return res.status(200).json({
        success: true,
        message: "Login successful",

        accessToken,
        refreshToken,

        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
      });
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const profile = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const adminDashboard = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hybrid Admin Dashboard",

    user: req.user,
  });
};

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1];

    if (token) {
      blacklistedTokens.push(token);
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Logout failed",
        });
      }

      res.clearCookie("sid");

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
