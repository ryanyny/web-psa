import { DataTypes, Model } from "sequelize"
import bcrypt from "bcrypt"
import sequelize from "../config/database.js"

class User extends Model {
    async matchPassword(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
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
            beforeSave: async (user) => {
                if (user.changed("password")) {
                    const salt = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(user.password, salt)
                }
            },
        },
    },
)

export default User