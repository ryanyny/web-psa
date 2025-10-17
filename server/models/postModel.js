import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"
import User from "./userModel.js"

const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "").trim()

class Post extends Model {}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
        },
        excerpt: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "Post",
        hooks: {
            beforeSave: (post) => {
                if (!post.excerpt && post.content) {
                    post.excerpt = stripHtml(post.content).slice(0, 200)
                }
            },
        },
    },
)

User.hasMany(Post, { foreignKey: "authorId", onDelete: "CASCADE" })
Post.belongsTo(User, { foreignKey: "authorId", as: "author" })

export default Post