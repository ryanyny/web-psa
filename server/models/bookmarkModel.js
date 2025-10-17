import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"
import User from "./userModel.js"
import Post from "./postModel.js"

class Bookmark extends Model {}

Bookmark.init(
    {
    },
    {
        sequelize,
        modelName: "Bookmark",
    },
)

User.belongsToMany(Post, { through: Bookmark, as: "bookmarks", foreignKey: "userId", otherKey: "postId", onDelete: "CASCADE" })
Post.belongsToMany(User, { through: Bookmark, as: "bookmarkedBy", foreignKey: "postId", otherKey: "userId", onDelete: "CASCADE" })

Bookmark.belongsTo(User, { foreignKey: "userId" })
Bookmark.belongsTo(Post, { foreignKey: "postId" })

export default Bookmark