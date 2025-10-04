import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Op } from "sequelize"
import User from "../models/userModel.js"

// Fungsi untuk generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// ========================
// REGISTER
// ========================
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    // Validasi input
    if ((!username, !email, !password)) {
      res.status(400)
      throw new Error("Please fill in all fields!")
    }

    // Cek apakah user dengan username/email sama sudah ada
    const exists = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    })
    if (exists) {
      res.status(400);
      throw new Error("User already exists!")
    }

    // Buat user baru
    const user = await User.create({ username, email, password })

    // Generate token dan simpan di cookie
    const token = generateToken(user.id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 1000, // 7 hari
    })

    // Kirim response user tanpa password
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
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

    // Cari user di database
    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(400);
      throw new Error("Invalid email or password!")
    }

    // Bandingkan password yang dimasukkan dengan password yang terenkripsi di database
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400)
      throw new Error("Invalid email or password!")
    }

    // Generate JWT token menggunakan ID user
    const token = generateToken(user.id)

    // Simpan token ke cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    // Kirim response user tanpa password
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ========================
// LOGOUT
// ========================
export const logout = async (req, res, next) => {
  // Hapus cookie
  res.clearCookie("token")
  // Kirim response
  res.status(200).json({ message: "Logged out successfully!" })
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