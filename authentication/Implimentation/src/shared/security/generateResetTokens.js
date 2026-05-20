import crypto from "crypto";


export const generateResetTokens = () => {
    return crypto.randomBytes(32).toString("hex");
};