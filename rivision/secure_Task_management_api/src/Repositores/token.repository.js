

import { blacklistedTokens } from "../data/blacklistedTokens.js";
import {refreshTokens} from "../data/refreshTokens.js";


export const tokenrepo = {
    saveRefreshToken(token) {
        refreshTokens.push(token);
        return token;
    },

    checkExists(token) {
        refreshTokens.includes(token);
        return token;
    },

    removeToken(token) {
        const tokenIndex = refreshTokens.indexOf(token);

        if(tokenIndex !== -1) {
              refreshTokens.splice(tokenIndex, 1)
        }

        return tokenIndex;
     },

     blacklist(Token) {
        blacklistedTokens.push(token);

     },

     isBlcklisted(token) {
        return blacklistedTokens.includes(token);
     }
}