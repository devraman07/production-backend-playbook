import { updateUserservice } from "../services/updateUser.service.js";

export const updateUserController = (req, res) => {
  try {
    const targetUserId = req.params.id;
    const updateData = req.body;

    const result = updateUserservice(targetUserId, updateData);

    if (!result.success) {
      return res.status(result.statuscode).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
        success : true,
        user : result.user,
        message : result.message,
    })
  } catch (error) {
    return res.status(500).json({
        success : false,
        error : error.message,
        message : "error in update user controller",
    })
  }
};
