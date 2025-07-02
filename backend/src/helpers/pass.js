import bcrypt from "bcryptjs";

const hashPw = async (password) => {
    return await bcrypt.hash(password, 10);
}

const comparePw = async (password, hashedPw) => {
    return await bcrypt.compare(password, hashedPw);
}

export default {hashPw, comparePw};