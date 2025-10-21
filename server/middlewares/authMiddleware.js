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
        
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired!" })
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token!" })
        }
        
        return res.status(500).json({ message: "Authentication error!" })
    }
}

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        res.status(403).json({ message: "Access denied! Admins only." })
    }
}

export { protect, adminOnly }