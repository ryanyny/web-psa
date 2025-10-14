import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"
import User from "./userModel.js"
import Post from "./postModel.js"

class Comment extends Model {}

Comment.init(
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Comment",
    },
)

Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" })
Comment.belongsTo(Post, { foreignKey: "postId" })

User.hasMany(Comment, { foreignKey: "authorId", as: "author", onDelete: "SET NULL" })
Comment.belongsTo(User, { foreignKey: "authorId", as: "author" })

export default Comment