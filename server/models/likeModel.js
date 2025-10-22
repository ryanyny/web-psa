import { Model } from "sequelize"
import sequelize from "../config/database.js"
import User from "./userModel.js"
import Post from "./postModel.js"

// Model perantara (junction model) antara User dan Post (like)
class Like extends Model {}

Like.init(
    {}, // Model ini tidak memerlukan field lain, hanya foreign key bawaan
    {
        sequelize,
        modelName: "Like",
        indexes: [
            // Menjamin setiap kombinasi userId dan postId hanya ada sekali (user tidak bisa like post yang sama dua kali)
            { unique: true, fields: ["userId", "postId"] },
        ],
    },
)

// Definisi relasi Many-to-Many (User <-> Post)
User.belongsToMany(Post, { through: Like, as: "likedPosts", foreignKey: "userId", })

Post.belongsToMany(User, { through: Like, as: "likedBy", foreignKey: "postId", })

export default Like