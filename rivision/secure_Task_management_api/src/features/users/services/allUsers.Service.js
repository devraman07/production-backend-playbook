import { users } from "../../../data/users.js"

export const getallUsersService = () => {
    const safeUsers = users.map((user) => ({
        id : user.id,
        name : user.name,
        email : user.email,
        role : user.role

    }));

    return {
        success : true,
        users : safeUsers,
        message : "all users found"
    }
}