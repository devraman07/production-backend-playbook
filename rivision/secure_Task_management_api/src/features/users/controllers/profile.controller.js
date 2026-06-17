import { fetchUserProfileService } from "../services/profile.service.js";



export const profileController = (req, res) => {

    try {
       const id = req.user.id;

   

    const result = fetchUserProfileService(id);

    return res.status(200).json({
        success : true,
        uerProfile : result.user,
        message : "user found",
    }) 
    } catch (error) {
        return res.status(500).json({
            success : false,
            error : error.message ,
            data : null,
        })
    }
}