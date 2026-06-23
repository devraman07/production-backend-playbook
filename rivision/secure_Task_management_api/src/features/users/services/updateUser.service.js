import { userrepo } from "../../../Repositores/User.repository.js";



export const updateUserservice = (
    targetUserId, updateData
) => {
    const user = userrepo.findById(targetUserId);

    if(updateData.name) {
        user.name = updateData.name;
    }

    if(updateData.email) {
        user.email = updateData.email;
    }


    if(!user) {
        return {
            success : false,
            statuscode : 403,
            message : "User not found"
        }
    }

    const safeUser = {
        id : user.id,
        email : user.email,
        name : user.name,
        role : user.role,

    }

    return {
        success : true,
        user : safeUser,
        message : "user updated successfully",
    }
}