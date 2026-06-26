import { tokenrepo } from "../../../Repositores/token.repository.js";
import { userrepo } from "../../../Repositores/User.repository.js";
import { generateHashedpassword } from "../../../shared/utils/hashedPassword.js";
import { generateHashedpassword as hashToken } from "../../../shared/utils/hashedPassword.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt.js";

export const registerService = async ({
  name,
  email,
  password,
}) => {
  try {
    if (!name || !email || !password) {
      return {
        success: false,
        message: "all fields are required",
      };
    }

    // check existing user
    const existingUser = await userrepo.findByEmail(email);

    if (existingUser) {
      return {
        success: false,
        message: "user already exists",
      };
    }

    // hash password
    const hashedPassword =
      await generateHashedpassword(password);

    // create user
    const newUser = await userrepo.create({
      name,
      email,
      passwordHash: hashedPassword,
    });

    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    // generate tokens
    const refreshToken = generateRefreshToken(payload);
    const accessToken = generateAccessToken(payload);

    // hash refresh token before saving
    const hashedRefreshToken =
      await hashToken(refreshToken);

    await tokenrepo.saveRefreshToken({
      userId: newUser.id,
      tokenHash: hashedRefreshToken,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    return {
      success: true,
      user: safeUser,
      statusCode: 201,
      accessToken,
      refreshToken,
      message: "User registered successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      
      success: false,
      message: "internal server error in service layer",
    };
  }
};