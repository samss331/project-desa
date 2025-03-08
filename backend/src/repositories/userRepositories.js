import db from "../config/database.js";
import model from "../model/model.js";

const getUserByEmail = async (email) => {
    const [rows] = await db.promise().query(
        "SELECT * FROM users where email = ?", [email]
    );
    if(rows.length === 0) return null;

    const {id, nama, password} = rows[0];
    return new model.User (id, nama, email, password);
}

const updateUserByEmail = async (nama, email, password) => {
    const user = await getUserByEmail(email)
    if(!user) throw new Error ("User dengan email tersebut tidak ditemukan!")

    const [result] = await db.promise().query(
        "UPDATE users SET nama = ?, password = ? WHERE email = ?", 
        [nama, password, email]
    );
    return result.affectedRows > 0;
}

export default {getUserByEmail, updateUserByEmail};