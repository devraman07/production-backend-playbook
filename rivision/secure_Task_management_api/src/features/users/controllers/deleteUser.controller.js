import { deleteUserService } from "../services/deleteUser.service.js";



export const deleteUserController = (req, res) => {
    try {
        const targetUserId = req.params.id;

        const result  = deleteUserService(
            targetUserId
        );

        if(!result.success) {
            return res.status(result.statusCode).json({
                success : false,
                message : result.message
            });
        }

        return res.status(200).json({
            success : true,
            message : result.message
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal server error in delete user controller",
        })
    }
}