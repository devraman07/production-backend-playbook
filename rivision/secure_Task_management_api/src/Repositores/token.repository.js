

import {refreshTokens} from "../data/refreshTokens.js";


export const tokenrepo = {
    saveRefreshToken(token) {
        refreshTokens.push(token);
        return token;
    }
}