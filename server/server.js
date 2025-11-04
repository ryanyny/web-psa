import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import morgan from "morgan"

import config from "./config/config.js"
import sequelize, { connectDb } from "./config/database.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import routes from "./routes/index.js"
import partnerRoutes from "./routes/landing/partnerRoutes.js"
import participantRoutes from "./routes/landing/participantRoutes.js"
import programRoutes from "./routes/landing/programRoutes.js"

import "./models/userModel.js"
import "./models/postModel.js"
import "./models/categoryModel.js"
import "./models/commentModel.js"
import "./models/likeModel.js"
import "./models/bookmarkModel.js"
import "./models/participantModel.js"
import "./models/partnerModel.js"
import "./models/programModel.js"
import "./models/applicantModel.js"
import "./models/applicantEducationModel.js"
import "./models/applicantWorkExperienceModel.js"
import "./models/applicantSkillModel.js"
import "./models/applicantSkillScoreModel.js"

// Inisialisasi aplikasi express
const app = express()
const PORT = config.port

// --- Koneksi database dan sinkronisasi model ---
connectDb().then(async () => {
    // sequelize.sync({ alter: true }) // Hanya diaktifkan untuk sinkronisasi model ke DB saat pertama kali. Nonaktifkan di production
    console.log("✅ All models synchronized with MySQL!")
    
    if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
        throw new Error("❌ Missing required DB environment variables!")
    }
})

if (!process.env.JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is missing in environment variables")
}

if (config.isDev) app.use(morgan("dev"))

// Konfigurasi CORS (Cross-Origin Resource Sharing)
app.use(
    cors({
        credentials: true,
        origin: [process.env.CLIENT_URL || "http://localhost:5173"],
    })
)

// Middleware untuk parsing JSON body dari request
app.use(express.json())
// Middleware untuk parsing cookies dari request
app.use(cookieParser())

// --- Definisi routes ---
// Routes API utama
app.use("/api", routes)

// Routes untuk landing page
app.use("/api/mitra", partnerRoutes)
app.use("/api/peserta", participantRoutes)
app.use("/api/program", programRoutes)

// Melayani file statis dari folder 'uploads' di URL '/uploads'
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

// Routes test server (health check)
app.get("/", (req, res) => {
    res.json({ message: "🚀 Hello from server!" })
})

// Middleware penanganan error global. Wajib diletakkan paling akhir sebelum app.listen
app.use(errorMiddleware)

// Menjalankan server
app.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}`)
})