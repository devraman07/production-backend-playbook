import { loginUser, registerUser } from "../service/userservice.js";

export const register = (req, res) => {
  try {
    const result = registerUser(req.body);

    if (!result.success) {
      return res.status(409).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",

      user: result.user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = (req, res) => {
  try {
    
    const result = loginUser(req.body);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",

      user: result.user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
