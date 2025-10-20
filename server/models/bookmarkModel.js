import { Model } from "sequelize"
import sequelize from "../config/database.js"
import User from "./userModel.js"
import Post from "./postModel.js"

// Model perantara (junction model) antara User dan Post (bookmark)
class Bookmark extends Model {}

Bookmark.init(
    {}, // Model ini tidak memerlukan field lain, hanya foreign key bawaan
    {
        sequelize,
        modelName: "Bookmark",
        indexes: [
            // Menjamin setiap kombinasi userId dan postId hanya ada sekali (user tidak bisa bookmark post yang sama dua kali)
            { unique: true, fields: ["userId", "postId"] }
        ]
    }
)

// --- Definisi relasi Many-to-Many (User <-> Post) ---
User.belongsToMany(Post, { through: Bookmark, as: "bookmarks", foreignKey: "userId", otherKey: "postId", onDelete: "CASCADE", })
Bookmark.belongsTo(Post, { foreignKey: "postId" })

Post.belongsToMany(User, { through: Bookmark, as: "bookmarkedBy", foreignKey: "postId", otherKey: "userId", onDelete: "CASCADE", })
Bookmark.belongsTo(User, { foreignKey: "userId" })

export default Bookmark