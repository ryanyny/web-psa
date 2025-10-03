import dotenv from "dotenv"

dotenv.config()

const config = Object.freeze({
    port: process.env.PORT || 3000,
    databaseURI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/blog",
    nodeEnv: process.env.NODE_ENV || "development"
})

export default config