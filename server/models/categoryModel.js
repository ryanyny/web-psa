import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"
import Post from "./postModel.js"

// Mendefinisikan class Category yang mewarisi Model Sequelize
class Category extends Model {}

Category.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "Category",
    }
)

// --- Definisi relasi Many-To-Many (Post <-> Category)
Post.belongsToMany(Category, { through: "PostCategories", as: "categories" })
Category.belongsToMany(Post, { through: "PostCategories", as: "posts" })

export default Category