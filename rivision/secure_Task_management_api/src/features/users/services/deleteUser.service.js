
import { userrepo } from "../../../Repositores/User.repository.js";

export const deleteUserService = (targetUserId) => {
  const userIndex = userrepo.findById(targetUserId);

  if (userIndex === -1) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  userrepo.delete(userIndex);

  return {
    success : true,
    message : "user deleted successfully",
  }
};


