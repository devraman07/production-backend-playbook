import jwt from "jsonwebtoken";

export const checkAuthenticated = (req, res, next) => {
  try {
    if (req.session?.user) {
      req.user = req.session.user;

      return next();
    }

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      req.user = decode;

      return next();
    }
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
