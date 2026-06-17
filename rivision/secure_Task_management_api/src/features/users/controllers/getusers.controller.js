import { getallUsersService } from "../services/allUsers.Service.js"


export const getusersController = (req, res) => {

    try {
        const result = getallUsersService();

        if(!result.success) {
            return res.status(500).json({
                success : false,
                error : result.message,
            })
        }

        return res.status(200).json({
            success : true,
            users : result.users
        })
    } catch (error) {
        return res.status(500).json({
                success : false,
                error : error.message,
            });
    }
}