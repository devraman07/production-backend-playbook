export const contentNegotiation = (req, res, next) => {
  if (req.headers["accept"] && req.headers["accept"] !== "application/json") {
    return res.status(406).json({
      success: false,
      data: null,
      error: "Not Acceptable",
    });
  }
  next();
};
