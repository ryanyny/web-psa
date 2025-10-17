import dotenv from "dotenv"

dotenv.config()

// Definisi konfigurasi aplikasi utama
const config = Object.freeze({
    port: process.env.PORT || 3000,
    isDev: process.env.NODE_ENV !== "production",
    jwtSecret: process.env.JWT_SECRET,
})

export default config