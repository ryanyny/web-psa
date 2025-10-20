import { DataTypes, Model } from "sequelize"
import bcrypt from "bcrypt"
import sequelize from "../config/database.js"

// Definisi model User
class User extends Model {
    // Method untuk compare password input dengan hash di database
    async matchPassword(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    }
}

// Inisialisasi struktur tabel User
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
            // Tambahkan opsi 'recruiter' agar bisa membedakan akses
            type: DataTypes.ENUM("user", "admin", "recruiter"),
            defaultValue: "user"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        // Hook yang berjalan sebelum data disimpan
        hooks: {
            beforeSave: async (user) => {
                // Hash ulang jika password diubah
                if (user.changed("password")) {
                    const salt = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(user.password, salt)
                }
            },
        },
    },
)

export default User