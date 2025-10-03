import mongoose from "mongoose"
import config  from "./config.js"

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(config.databaseURI)
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`❌ error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDb