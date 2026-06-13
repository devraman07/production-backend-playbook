import { ROLES } from "../../../data/roles.js";
import { users } from "../../../data/users.js";
import { generateHashedpassword } from "../../../shared/utils/hashedPassword.js";





export const registerService = async ({
    name , email , password 
}) => {
       
    try {
       const existingUser = users.find((u) => u.email === email);

       if(existingUser) {
        return {
            success : false,
            error : "user already exists"
        }
    }

    const hashedPassword = await generateHashedpassword(password);

    

    const newUser = {
        id : crypto.randomUUID(),
        name : name,
        email : email,
        password : hashedPassword,
        role : ROLES.MEMBER
    };

    users.push(newUser);

    return {
        success : true,
        user : newUser,
    }
    } catch (error) {
        return {
            success : false,
            error : "internal server error in service layer"
        }
    }
};