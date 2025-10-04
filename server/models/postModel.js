import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"
import User from "./userModel.js"

// Utility function untuk menghapus semua tag html dari teks
const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "").trim()

// Definisi model User
class Post extends Model {}

// Inisialisasi struktur tabel Post
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
        coverImage: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "Post",
        // Hook yang berjalan sebelum data disimpan
        hooks: {
            beforeSave: (post) => {
                // Otomatis membuat excerpt dari isi content (200 karakter pertama)
                if (!post.excerpt && post.content) {
                    post.excerpt = stripHtml(post.content).slice(0, 200)
                }
            },
        },
    }
)

// Relasi: satu user bisa mempunyai banyak post
User.hasMany(Post, { foreignKey: "authorId", onDelete: "CASCADE" }) // Post ikut terhapus jika user dihapus
// Relasi: satu post dimiliki oleh satu user (author)
Post.belongsTo(User, { foreignKey: "authorId", as: "author" })

export default Post