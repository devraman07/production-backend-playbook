import { ROLES } from "../../../data/roles.js";
import { users } from "../../../data/users.js";
import { tokenrepo } from "../../../Repositores/token.repository.js";
import { userrepo } from "../../../Repositores/User.repository.js";
import { generateHashedpassword } from "../../../shared/utils/hashedPassword.js";
import { generateAccessToken, generateRefreshToken } from "../../../shared/utils/jwt.js";

export const registerService = async ({ name, email, password }) => {
  try {
    if (!name || !email || !password) {
      return {
        success: false,
        message: "all fields are required",
      };
    }

    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return {
        success: false,
        error: "user already exists",
      };
    }

    const hashedPassword = await generateHashedpassword(password);

    const newUser = {
      id: crypto.randomUUID(),
      name: name,
      email: email,
      password: hashedPassword,
      role: ROLES.MEMBER,
    };

    userrepo.create(newUser);

    const payload = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    };

    const refreshToken = generateRefreshToken(payload);

    const accessToken = generateAccessToken(payload);
    tokenrepo.saveRefreshToken(refreshToken);

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    return {
      success: true,
      user: safeUser,
      statusCode : 201,
      sessionUser : safeUser,
      accessToken : accessToken,
      refreshToken : refreshToken,
      message : "User registered Successfylly",
    };
  } catch (error) {
    return {
      success: false,
      error: "internal server error in service layer",
    };
  }
};
