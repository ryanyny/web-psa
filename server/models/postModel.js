import { DataTypes, Model } from "sequelize"
import slugify from "slugify"
import sequelize from "../config/database.js"
import User from "./userModel.js"

// Helper function: Menghapus semua tag HTML dan spasi
const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "").trim()

// Mendefinisikan class Post yang mewarisi Model sequelize
class Post extends Model {
    // Metode instance khusus untuk mengontrol output JSON
    toJSON() {
        const values = { ...this.get() }
        delete values.authorId
        return values
    }
}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
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
            // Hook sebelum validasi: Membuat slug dari judul jika belum ada
            beforeValidate: (post) => {
                if (post.title && !post.slug) {
                    post.slug = slugify(post.title, { lower: true, strict: true })
                }
            },
            // Hook sebelum menyimpan: Membuat excerpt jika belum ada
            beforeSave: (post) => {
                if (!post.excerpt && post.content) {
                    post.excerpt = stripHtml(post.content).slice(0, 200)
                }
            },
        },
    },
)

// --- Definisi relasi (Associations) ---
User.hasMany(Post, { foreignKey: "authorId", onDelete: "CASCADE" })
Post.belongsTo(User, { foreignKey: "authorId", as: "author" })

export default Post