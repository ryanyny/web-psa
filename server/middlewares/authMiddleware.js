import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// Definisi cookieOptions untuk menghapus cookie secara konsisten
    const cookieOptionsClear = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
    }

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
            res.clearCookie("token", cookieOptionsClear)
            return res
                .status(401)
                .json({ message: "Not authorized, user not found!" })
            }

        req.user = user.toJSON()

        next()
    } catch (error) {
        console.error("Auth Middleware Error: ", error.message)

        res.clearCookie("token", cookieOptionsClear)
        
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired!" })
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token!" })
        }
        
        return res.status(500).json({ message: "Authentication error!" })
    }
}

const authorize = (allowedRoles = []) => (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Authentication required before checking role!" })
    }

    const userRole = req.user.role

    if (allowedRoles.includes(userRole)) {
        next()
    } else {
        res.status(403).json({ message: "Access denied. You do not have the required permissions!" })
    }
}

export const admin = authorize(["admin"])
export const user = authorize(["admin", "user"])
export const onlyAdmin = authorize(["admin"])

export { protect, authorize }