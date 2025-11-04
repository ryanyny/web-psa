import Category from "../../models/categoryModel.js";
import Post from "../../models/postModel.js";
import User from "../../models/userModel.js";

// --- Controller: CREATE CATEGORY ---
export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body

        // Validasi: Semua field wajib diisi
        if (!name) {
            res.status(400)
            throw new Error("Please fill in all fields!")
        }

        // Cek: Nama kategori harus unik
        const existing = await Category.findOne({ where: { name } })
        if (existing) {
            res.status(400)
            throw new Error("Category already exists!")
        }

        // Buat kategori baru
        const category = await Category.create({ name })

        res.status(201).json({
            message: "Category created successfully!",
            category,
        })
    } catch (error) {
        next(error)
    }
}

// --- Controller: GET ALL CATEGORIES ---
export const getAllCategories = async (req, res, next) => {
    try {
        // Ambil semua kategori, diurutkan berdasarkan nama secara ascending
        const categories = await Category.findAll({ order: [["name", "ASC"]] })

        res.json(categories)
    } catch (error) {
        next(error)
    }
}

// --- Controller: GET POSTS BY CATEGORY ID ---
export const getPostByCategory = async (req, res, next) => {
    try {
        // Cari kategori berdasarkan ID, sekaligus ambil semua posts terkait
        const category = await Category.findByPk(req.params.id, {
            include: {
                model: Post,
                as: "posts",
                    // Nested include: Ambil juga data Author untuk setiap Post
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

        res.json(category.posts || [])
    } catch (error) {
        next(error)
    }
}

// --- Controller: UPDATE CATEGORY ---
export const updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body
        const category = await Category.findByPk(req.params.id)

        if (!category) {
            res.status(404)
            throw new Error("Category not found!")
        }

        // Cek duplikasi nama baru, kecuali nama itu adalah nama kategori yang sedang di-update
        const existing = await Category.findOne({ where: { name } })
        if (existing && existing.id !== category.id) {
            res.status(400)
            throw new Error("Category already exists!")
        }

        // Update field name jika ada di body request
        category.name = req.body.name || category.name

        // Simpan perubahan data kategori
        await category.save()

        res.json({
            message: "Category updated successfully!",
            category,
        })
    } catch (error) {
        next(error)
    }
}

// --- Controller: DELETE CATEGORY ---
export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id)
        if (!category) {
            res.status(404)
            throw new Error("Category not found!");
        }

        // Hapus kategori dari database
        await category.destroy()

        res.json({ message: "Category deleted successfully!" })
    } catch (error) {
        next(error)
    }
}