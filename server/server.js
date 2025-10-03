import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import config from "./config/config.js"
import connectDb from "./config/database.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/postRoutes.js"

// Inisialisasi express
const app = express()
const PORT = config.port

// Connect ke database
connectDb()

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

// Route prefix
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