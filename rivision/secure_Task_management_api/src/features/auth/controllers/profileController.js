import { profileservice } from "../services/profileservice.js";

export const userProfile = (req, res) => {
  try {
    const userId = req.user.id;

    const result = profileservice(userId);
    if (!result.success) {
      return res.status(result.statusCode).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
