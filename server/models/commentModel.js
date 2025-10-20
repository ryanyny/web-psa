import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"
import User from "./userModel.js"
import Post from "./postModel.js"

// Mendefinisikan class Comment yang mewarisi Model Sequelize
class Comment extends Model {}

Comment.init(
    {
        content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
        // ID komentar induk. Null jika ini adalah komentar utama, berisi ID jika ini adalah balasan (reply)
        parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    },
    {
        sequelize,
        modelName: "Comment",
        indexes: [
            { fields: ["postId"] },
            { fields: ["parentId"] },
        ],
    },
)

// --- Relasi komentar dengan Post ---
Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE", })
Comment.belongsTo(Post, { foreignKey: "postId" })

// --- Relasi komentar dengan User (Author) ---
User.hasMany(Comment, { foreignKey: "authorId", as: "author", onDelete: "SET NULL", })
Comment.belongsTo(User, { foreignKey: "authorId", as: "author", })

// --- Relasi komentar berjenjang (thread comments / self-association)
Comment.hasMany(Comment, { foreignKey: "parentId", as: "replies", onDelete: "CASCADE", })
Comment.belongsTo(Comment, { foreignKey: "parentId", as: "parent", })

export default Comment