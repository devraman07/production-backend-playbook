import { users } from "../../../data/users.js"



export const profileservice = (userId) => {
    const user = users.find((u) => u.id === userId);

    if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return {
    success: true,
    user: safeUser,
  };
};
