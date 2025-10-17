import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// Middleware untuk memverifikasi JWT dan melindungi routes
const protect = async (req, res, next) => {
    try {
        // Ambil token JWT dari cookie request
        const token = req.cookies.token
        if (!token) {
            return res
                .status(401)
                .json({ message: "Not authorized, token missing!" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Cari user di database berdasarkan ID dari token yang sudah di-decode
        const user = await User.findByPk(decoded.id, {
            // Kecualikan password dari hasil query untuk alasan keamanan
            attributes: { exclude: ["password"] },
        })
        if (!user) {
            return res
                .status(401)
                .json({ message: "Not authorized, user not found!" })
            }

        req.user = user
        next()
    } catch (error) {
        console.error("Auth Middleware Error: ", error.message)
        return res.status(401).json({ message: "Invalid or expired token!" })
    }
}

export default protect