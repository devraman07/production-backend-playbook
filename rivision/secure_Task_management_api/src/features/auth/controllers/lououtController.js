import { logOutService } from "../services/logoutService.js";

export const logoutController = (req, res) => {
  try {
    const { refreshToken } = req.body;

    const result = logOutService(refreshToken);

    if (!result.success) {
      return res.status(result.statusCode).json({
        message: result.message,
        success: false,
      });
    }

    req.session.destroy();

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
