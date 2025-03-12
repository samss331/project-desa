import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Akses Ditolak!" });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
        req.user =  verified;
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(400).json({success: false, message: "Token tidak valid!"})
    }
}

export default authAdmin;