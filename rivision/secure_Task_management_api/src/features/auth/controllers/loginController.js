import { loginService } from "../services/loginservice.js";

export const loginController = async (req, res) => {
  try {
    
    const result = await loginService(req.body);


    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    req.session.user = result.sessionUser;

    
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
      data: null,
      error: error.message,
      message: "Internal server error in the controller layer",
    });
  }
};
