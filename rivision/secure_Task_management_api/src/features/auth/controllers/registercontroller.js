import { registerService } from "../services/registerService.js";

export const registerController = async (req, res) => {
  try {
    const result = await registerService(req.body);

    if (!result.success) {
      return res.status(409).json({
        success: false,
        error: result.message,
      });
    }

    return res.status(result.statusCode).json({
      success: true,
      message: result.message,
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error in controller layer",
    });
  }
};
