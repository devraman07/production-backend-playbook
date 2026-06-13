import { users } from "../../../data/users.js"
import { comparePassword } from "../../../shared/utils/comparePassword.js";


export const loginService = async ({email , password}) => {
          

    const user = users.find((u) => u.email === email);

    if(!user) {
        return {
            success : false,
            message : "User not found",
        }
    }

    const correctpassword = await comparePassword(password, user.password);

    if(!correctpassword) {
        return {
            success : false,
            message : "wrong password",
        }
    }


    return {
        success : true,
        user : user,
    }
}