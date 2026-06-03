import jwt from "jsonwebtoken";
import {blacklistedTokens} from "../database/blacklistedTokens.js";

export const requireAuth = (req, res, next) => {
  try {
    //check for sessions
    if (req.session?.user) {
      req.user = req.session.user;
      return next();
    }

    //check for jwt
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    if(blacklistedTokens.includes(token)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decode;

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};



