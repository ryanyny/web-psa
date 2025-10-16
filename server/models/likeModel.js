import { DataTypes, Model } from 'sequelize'
import sequelize from "../config/database.js"
import User from "./userModel.js"
import Post from "./postModel.js"

class Like extends Model {}

Like.init(
    {
    },
    {
        sequelize,
        modelName: "Like",
    }
)

User.belongsToMany(Post, { through: Like, as: "likedPosts", foreignKey: "userId" })
Post.belongsToMany(User, { through: Like, as: "likedBy", foreignKey: "postId" })

export default Like