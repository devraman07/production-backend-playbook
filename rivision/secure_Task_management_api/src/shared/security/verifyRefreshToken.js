import jwt from "jsonwebtoken";



export const verifyRefreshTokens = (token) => {
    const verifiedToken = jwt.decode(token, process.env.JWT_REFRESH_SECRET);

    
};