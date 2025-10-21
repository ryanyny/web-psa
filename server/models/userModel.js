import { DataTypes, Model } from "sequelize"
import bcrypt from "bcrypt"
import sequelize from "../config/database.js"

// Mendefinisikan class User yang mewarisi Model Sequelize
class User extends Model {
    // Metode instance: Membandingkan password yang dimasukkan dengan hash password di database
    async matchPassword(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    }

    // Metode instance: Mengontrol output data User saat dikonversi ke JSON
    toJSON() {
        const values = { ...this.get() }
        delete values.password
        return values
    }
}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        gender: {
            type: DataTypes.ENUM("laki-laki", "perempuan"),
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        hooks: {
            // Hook sebelum menyimpan: Hashing password
            beforeSave: async (user) => {
                // Hanya hash password jika field password diubah atau baru dibuat
                if (user.changed("password")) {
                    const salt = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(user.password, salt)
                }
            },
        },
    },
)

export default User