import mongoose from "mongoose"
import bcrypt from "bcrypt"

// Definisi schema User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

// Middleware pre save
userSchema.pre("save", async function (next) {
    // Jika password tidak diubah, skip proses hashing
    if (!this.isModified("password")) return next()

    // Generate salt & hash password sebelum disimpan ke database
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

// Method untuk mengecek pasword saat login
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Bandingkan password yang diinput user dengan hash di database
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model("User", userSchema)