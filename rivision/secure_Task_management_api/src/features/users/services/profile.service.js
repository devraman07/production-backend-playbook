import { users } from "../../../data/users.js";
import { userrepo } from "../../../Repositores/User.repository.js";



export const fetchUserProfileService = (id)  => {

    if(!id) {
        return {
            success : false,
            statusCode : 403,
            message : "authenticate frist"
        };
    }

    const profile = userrepo.findById(id);

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