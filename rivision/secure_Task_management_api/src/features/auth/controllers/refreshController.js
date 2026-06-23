import { refreshService } from "../services/refreshService.js";

export const refreshController = (req, res) => {
  try {
    const { refreshToken } = req.body;

    const result = refreshService({ refreshToken }); 

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      accessToken: result.accessToken,
      refreshToken : result.refreshToken,
      message : result.message,
    });
  } catch (error) {
    return res.status(403).json({
    success: false,
      message: "Token expired or invalid",
    });
  }
};
