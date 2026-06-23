
import { userrepo } from "../../../Repositores/User.repository.js";

export const getallUsersService = () => {

  const user = userrepo.findAll();
     
    const safeUsers = ({
        id : user.id,
        name : user.name,
        email : user.email,
        role : user.role

    });

    return {
        success : true,
        users : safeUsers,
        message : "all users found"
    }
}