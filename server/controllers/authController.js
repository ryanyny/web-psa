import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Op } from "sequelize"
import User from "../models/userModel.js"

// Helper function: Membuat JSON Web Token (JWT) yang kedaluwarsa dalam 7 hari
const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// --- Controller: REGISTER ---
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Validasi: Semua field wajib diisi
    if (!name || !email || !password) {
      res.status(400)
      throw new Error("Please fill in all fields!")
    }

    // Cek duplikasi: Cek apakah email / nama sudah ada
    const exists = await User.findOne({
      where: {
        [Op.or]: [{ email }, { name }],
      },
    })
    if (exists) {
      res.status(400)
      throw new Error("User already exists!")
    }

    // Buat user baru
    const user = await User.create({ name, email, password })
    const token = generateToken(user.id)

    // Set token sebagai cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    next(error)
  }
}

// --- Controller: LOGIN ---
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(400)
      return next(new Error("Invalid email or password!"))
    }

    // Verifikasi password menggunakan method instance dari Model User
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      res.status(400)
      return next(new Error("Invalid email or password!"))
    }

    const token = generateToken(user.id)

    // Set token sebagai cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    next(error)
  }
}

// --- Controller: LOGOUT ---
export const logout = async (req, res, next) => {
  // Menghapus cookie token dari browser
  res.clearCookie("token")
  res.status(200).json({ message: "Logged out successfully!" })
}

// --- Controller: CURRENT USER ---
export const currentUser = async (req, res, next) => {
  try {
    res.json(req.user)
  } catch (error) {
    next(error)
  }
}