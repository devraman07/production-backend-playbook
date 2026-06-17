import { users } from "../../../data/users.js";



export const fetchUserProfileService = (id)  => {

    if(!id) {
        return {
            success : false,
            statusCode : 403,
            message : "authenticate frist"
        };
    }

    const profile = users.find((u) => u.id === id);

    const safeUser = {
        id : profile.id,
        email : profile.email,
        name : profile.name,
        role : profile.role,
    }

    return {
        success : true,
        user : safeUser,
    }
}