import { blacklistedTokens } from "../../../data/blacklistedTokens.js";
import { refreshTokens } from "../../../data/refreshTokens.js";



export const logOutService = (refreshToken) => {
    
    if(!refreshToken) {
        return {
            success : false,
            statusCode : 401,
            message : "refreshToken not here"
        };
    }

    const index = refreshTokens.indexOf(refreshToken);

    if(index === -1) {
        return {
            success : false,
            statusCode : 403,
            message : "invalid refreshToken"
        }
    }

    blacklistedTokens.push(index);

    refreshTokens.splice(index, 1);



    return {
        success : true,
        message : "logged out successfully",
    }
}