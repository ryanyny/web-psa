import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// Middleware untuk protect route (hanya user login yang bisa akses)
const protect = async (req, res, next) => {
    try {
        // Ambil token dari cookie
        const token = req.cookies.token

        // Jika token tidak ada, kembalikan error 401 (unauthorized)
        if (!token) {
            return res.status(401).json({ messsage: "Not authorized, token missing!" })
        }

        // Verifikasi token menggunakan secret JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // Cari user berdasarkan ID dari token, exclude password
        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ["password"] },
        })
        if (!user) {
            return res.status(401).json({message: "Not authorized, user not found!" })
        }

        // Simpan data user
        req.user = user
        next()
    } catch (error) {
        // Jika ada error, kembalikan status 401
        console.error("Auth Middleware Error: ", error.message)
        return res.status(401).json({ message: "Invalid or expired token!" })
    }
}

export default protect