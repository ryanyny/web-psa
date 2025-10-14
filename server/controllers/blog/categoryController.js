import Category from "../../models/categoryModel.js"
import Post from "../../models/postModel.js"
import User from "../../models/userModel.js"

// ========================
// CREATE CATEGORY
// ========================
export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body
        if (!name) {
            res.status(400)

            throw new Error("Please fill in all fields!")
        }

        const category = await Category.create({ name })
        res.status(201).json({
            message: "Category created successfully!",
            category,
        })
    } catch (error) {
        next(error)
    }
}

// ========================
// GET ALL CATEGORIES
// ========================
export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll({ order: [["name", "ASC"]] })

        res.json(categories)
    } catch (error) {
        next(error)
    }
}

// ========================
// FILTER POST BY CATEGORY
// ========================
export const getPostByCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: {
                model: Post,
                as: "posts",
                include: {
                    model: User,
                    as: "author",
                    attributes: ["id", "name", "email"],
                },
            },
        })

        if (!category) {
            res.status(404)

            throw new Error("Category not found!")
        }

        res.json(category.posts)
    } catch (error) {
        next(error)
    }
}

// ========================
// UPDATE CATEGORY
// ========================
export const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            res.status(404)

            throw new Error("Category not found!")
        }

        category.name = req.body.name || category.name
        await category.save()

        res.json({
            message: "Post updated successfully!",
            category
        })
    } catch (error) {
        next(error)
    }
}

// ========================
// DELETE CATEGORY
// ========================
export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            res.status(404)
            
            throw new Error("Category not found!")
        }

        await category.destroy()
        res.json({ message: "Category deleted successfully!" })
    } catch (error) {
        next(error)
    }
}