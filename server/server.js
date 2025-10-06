import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import config from "./config/config.js"
import { connectDb } from "./config/database.js"
import sequelize from "./config/database.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/blog/postRoutes.js"
import partnerRoutes from "./routes/landing/partnerRoutes.js"
import participantRoutes from "./routes/landing/participantRoutes.js"
import programRoutes from "./routes/landing/programRoutes.js"
import "./models/userModel.js"
import "./models/postModel.js"
import "./models/participantModel.js"
import "./models/partnerModel.js"
import "./models/programModel.js"

// Inisialisasi express
const app = express()
const PORT = config.port

// Connect ke database
connectDb().then(async () => {
    console.log("✅ All models synchronized with MySQL!")

    if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
        throw new Error("❌ Missing required DB environment variables!")
    }
})

// Setup CORS
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:5173"],
    })
)

// Middleware
app.use(express.json())
app.use(cookieParser())

// Serve file statis dari folder "uploads"
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

// ========================
// ROUTE PREFIX
// ========================
// Landing page & dahboard admin
app.use("/api/mitra", partnerRoutes)
app.use("/api/peserta", participantRoutes)
app.use("/api/program", programRoutes)
// Blog
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)

// Route testing
app.get("/", (req, res) => {
    res.json({ message: "🚀 Hello from server!" })
})

// Middleware untuk handle semua error di server
app.use(errorMiddleware)

// Jalankan server
app.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}`)
})