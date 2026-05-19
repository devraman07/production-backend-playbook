export const requireHybridRole =
  (...allowedRoles) =>
  (req, res, next) => {
    try {
      const userRole =
        req.user?.role;

      if (!userRole) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (
        !allowedRoles.includes(
          userRole
        )
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Internal server error",
      });
    }
  };