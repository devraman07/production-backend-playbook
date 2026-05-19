import { users } from "../../../database/users.js";
import { ROLES } from "../../../shared/constants/roles.js";
import { hashpassword } from "../../../shared/security/hashPassword.js";
import { simulateDelay } from "../../../shared/security/simulatedelay.js"
import bcrypt from "bcrypt";
import crypto from "crypto";




export const signupUser = async({
    name , email , password
}) => {
    await simulateDelay();


    const existingUser = users.find((u) => u.email == email);

    if(existingUser) {
        return {
            success : false,
            message : "Authentication failed"
        };
    }

    const hashedPassword = await hashpassword(password);

    const newUser = {
        id : crypto.randomUUID(),
        name : name,
        email : email,
        password : hashedPassword,
        role : ROLES.USER,
        createdAt : Date.now()
    }
    users.push(newUser);


    return {
        success : true,
        user : newUser,
    }
}

export const loginUser = async({ email, password}) => {
    await simulateDelay();

    const user = users.find((u) => u.email == email);

     if (!user) {
    return {
      success: false,
      message:
        "Authentication failed",
    };
  }

  const passwordmatch = await bcrypt.compare(password, user.password);

  if(!passwordmatch) {
    return {
        success : false, 
        message : "authentication failed",
    };
  }

  return {
    success : true,
    user,
  }
}