import { logOutService } from "../services/logoutService.js";

export const logoutController = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const result = await logOutService(refreshToken);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(result.statusCode).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};