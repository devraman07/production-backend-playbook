import { userrepo } from "../../../Repositores/User.repository.js";



export const profileservice = (userId) => {
    const user = userrepo.findById(userId);


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
    statusCode : 200,
    user: safeUser,
  };
};
