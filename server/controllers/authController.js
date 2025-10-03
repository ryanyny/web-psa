import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// Fungsi untuk generate JWT token
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d"})
}

// ========================
// REGISTER
// ========================
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        // Validasi input
        if (!username, !email, !password) {
            res.status(400)
            throw new Error("Please provide username, email, and password!")
        }

        // Cek apakah user dengan username/email sama sudah ada
        const exists = await User.findOne({ $or: [{ email }, { username }] })
        if (exists) {
            res.status(400)
            throw new Error("User with that username or email already exists!")
        }

        // Buat user baru
        const user = await User.create({ username, email, password })

        // Generate token dan simpan di cookie
        const token = generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 1000,
        })

        // Kirim response user tanpa password
        res.status(201).json({ _id: user._id, username: user.username, email: user.email })
    } catch (error) {
        next(error)
    }
}

// ========================
// LOGIN
// ========================
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        // Validasi input
        if (!email || !password) {
            res.status(400)
            throw new Error("Please provide email and password!")
        }

        // Cari user berdasarkan email
        const user = await User.findOne({ email })
        // Cek password
        if (!user || !(await user.matchPassword(password))) {
            res.status(401)
            throw new Error("Invalid email or password")
        }

        // Generate token dan simpan di cookie
        const token = generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        // Kirim response user tanpa password
        res.json({ _id: user._id, username: user.username, email: user.email })
    } catch (error) {
        next(error)
    }
}

// ========================
// LOGOUT
// ========================
export const logout = async (req, res, next) => {
    try {
        // hapus cookie token
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax" 
        })

        res.json({ message: "Logged out" })
    } catch (error) {
        next(error)
    }
}

// ========================
// CURRENT USER
// ========================
export const currentUser = async (req, res, next) => {
    try {
        // Mengirim
        res.json(req.user)
    } catch (error) {
        next(error)
    }
}