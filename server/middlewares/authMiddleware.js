import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// Middleware untuk protect route (hanya user login yang bisa akses)
const protect = async (req, res, next) => {
    try {
        // Ambil token dari cookie
        const token = req.cookies.token

        // Jika token tidak ada, kembalikan error 401 (unauthorized)
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, token missing!")
        }

        // Verifikasi token menggunakan secret JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // Cari user berdasarkan ID dari token, exclude password
        const user = await User.findById(decoded.id).select("-password")
        if (!user) {
            res.status(401);
            throw new Error("Not authorized, user not found!")
        }

        // Simpan data user
        req.user = user
        next()
    } catch (error) {
        // Jika ada error, kembalikan status 401
        res.status(401)
        next(error)
    }
}

export default protect