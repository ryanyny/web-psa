import dotenv from "dotenv"

dotenv.config()

const config = Object.freeze({
    port: process.env.PORT || 3000,
    isDev: process.env.NODE_ENV !== "production",
    jwtSecret: process.env.JWT_SECRET,
})

export default config