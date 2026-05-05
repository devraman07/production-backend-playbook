export const contentCheck = (req, res, next) => {
  if (["POST", "PUT"].includes(req.method)) {
    if (req.headers["content-type"] !== "application/json") {
      return res.status(415).json({
        success: false,
        data: null,
        error: "Unsupported Media Type",
      });
    }
  }
  next();
};
