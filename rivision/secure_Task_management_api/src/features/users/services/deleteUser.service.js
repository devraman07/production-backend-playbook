import { users } from "../../../data/users.js";

export const deleteUserService = (targetUserId) => {
  const userIndex = users.findIndex((u) => u.id === targetUserId);

  if (userIndex === -1) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  users.splice(userIndex, 1);

  return {
    success : true,
    message : "user deleted successfully",
  }
};


