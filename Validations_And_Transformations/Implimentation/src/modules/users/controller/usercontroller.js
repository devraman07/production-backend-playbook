import { loginUser, registerUser } from "../service/userservice.js";
import {
  generateAccessToken,
  generaterefreshToken,
} from "../../../shared/utils/jwt.js";
import { blacklistedTokens } from "../../../database/blacklistedTokens.js";
import {ROLES} from "../../../shared/constants/roles.js";

export const register = (req, res) => {
  try {
    const result = registerUser(req.body);

    if (!result.success) {
      return res.status(409).json({
        success: false,
        message: result.message,
      });
    }

    req.session.user = {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role,
    };

    const payload = {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generaterefreshToken(payload);

    const safeUser = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      age: result.user.age,
      createdAt: result.user.createdAt,
      role: result.user.role,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: safeUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = (req, res) => {
  try {
    const result = loginUser(req.body);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    req.session.user = {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role,
    };

    const payload = {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generaterefreshToken(payload);

    const safeUser = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
      age: result.user.age,
      createdAt: result.user.createdAt,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",

      user: safeUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
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

export const logOut = (req, res) => {
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
          message: "Failed to log out",
        });
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to log out",
    });
  }
};
