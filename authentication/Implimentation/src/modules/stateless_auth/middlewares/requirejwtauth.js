import jwt, { decode } from "jsonwebtoken";
import { blacklistedTokens } from "../../../database/blacklistedTokens.js";

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (blacklistedTokens.includes(token)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const deocded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = deocded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
