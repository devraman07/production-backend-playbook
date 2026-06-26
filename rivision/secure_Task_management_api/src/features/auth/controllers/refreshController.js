import { refreshService } from "../services/refreshService.js";

export const refreshController = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const result = await refreshService(
      refreshToken,
      req.refreshUser
    );

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(result.statusCode).json({
      success: true,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      message: result.message,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};