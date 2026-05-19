import bcrypt from "bcrypt";


export const hashpassword = async(password) => {
    const saltrounds = 12;

     return await bcrypt.hash(password, saltrounds);

    };