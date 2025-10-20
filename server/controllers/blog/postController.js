import fs from "fs"
import path from "path"
import sequelize from "../../config/database.js"
import Post from "../../models/postModel.js"
import User from "../../models/userModel.js"
import Category from "../../models/categoryModel.js"

// Helper function: Menghapus file jika file tersebut ada di sistem
const deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

// --- Controller: CREATE POST ---
export const createPost = async (req, res, next) => {
  try {
    const { title, content, categories } = req.body

    if (!title || !content) {
      res.status(400)
      throw new Error("Please fill in all fields!")
    }

    // Bentuk URL gambar yang diunggah (jika ada) menggunakan protocol dan host saat ini
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null

    // Buat post baru di database
    const post = await Post.create({
      title,
      content,
      image: imageUrl,
      authorId: req.user.id,
    })

    // Logika penambahan kategori
    if (categories) {
      let categoryIds = []

      // Logika untuk menangani input categories baik sebagai Array ID atau String ID yang dipisahkan koma
      if (Array.isArray(categories)) {
        categoryIds = categories.map((id) => parseInt(id)).filter(Boolean)
      } else if (typeof categories === "string") {
        categoryIds = categories
          .split(",")
          .map((id) => parseInt(id))
          .filter(Boolean);
      }

      if (categoryIds.length > 0) {
        await post.setCategories(categoryIds);
      }
    }

    // Ambil post yang baru dibuat dengan relasi User dan Category
    const newPost = await Post.findByPk(post.id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "categories",
          attributes: ["id", "name"],
        },
      ],
    })

    res.status(201).json({
      message: "Post created successfully!",
      post: newPost,
    })
  } catch (error) {
    next(error)
  }
}

// --- Controller: GET ALL POSTS ---
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      attributes: {
        // Menambahkan kolom virtual "totalLikes" ke hasil query
        include: [
          [
            sequelize.fn(
              "COUNT",
              sequelize.fn("DISTINCT", sequelize.col("likedBy.id"))
            ),
            "totalLikes",
          ],
        ],
      },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "categories",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: User,
          as: "likedBy",
          attributes: [],
          through: { attributes: [] },
          required: false,
        },
      ],
      group: ["Post.id", "author.id", "categories.id"],
      order: [["createdAt", "DESC"]],
    })

    res.json(posts)
  } catch (error) {
    next(error)
  }
}

// --- Controller: GET POST BY ID / SLUG ---
export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params
    // Menentukan kondisi pencarian: berdasarkan SLUG (jika bukan angka) atau ID (jika angka)
    const where = isNaN(id) ? { slug: id } : { id }

    const post = await Post.findOne({
      where,
      // Include relasi Author dan Categories
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          as: "categories",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    })
    if (!post) {
      res.status(400)
      throw new Error("Post not found!")
    }

    res.json(post)
  } catch (error) {
    next(error)
  }
}

// --- Controller: UPDATE POST ---
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (!post) {
      res.status(404)
      throw new Error("Post not found!")
    }

    if (post.authorId !== req.user.id) {
      res.status(403)
      throw new Error("Not authorized to update this post!")
    }

    // Logika update gambar: Jika ada file baru diunggah dan post lama punya gambar
    if (req.file && post.image) {
      // Hapus file gambar lama dari direktori "uploads"
      const oldImagePath = path.join(
        process.cwd(),
        "uploads",
        path.basename(post.image)
      )
      deleteFileIfExists(oldImagePath)

      // Update URL gambar di database dengan file yang baru 
      post.image = `${req.protocol}://${req.get("host")}//uploads/${
        req.file.filename
      }`
    }

    // Update field title, content, dan excerpt jika ada di body request
    post.title = req.body.title || post.title
    post.content = req.body.content || post.content
    post.excerpt = req.body.excerpt || post.excerpt

    // Simpan perubahan data post
    await post.save()

    // Logika update kategori
    if (req.body.categories) {
      let categoryIds = []
      const { categories } = req.body

      // Parsing categoryIds (Array atau String)
      if (Array.isArray(categories)) {
        categoryIds = categories.map((id) => parseInt(id)).filter(Boolean)
      } else {
        categoryIds = categories
          .split(",")
          .map((id) => parseInt(id))
          .filter(Boolean)
      }
      
      // Ganti relasi kategori yang lama dengan yang baru
      await post.setCategories(categoryIds)
    }

    res.json({
      message: "Post updated successfully!",
      post,
    })
  } catch (error) {
    next(error)
  }
}

// Controller: --- DELETE POST ---
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (!post) {
      res.status(404)
      return next(new Error("Post not found!"))
    }

    if (post.authorId !== req.user.id) {
      res.status(403)
      return next(new Error("Not authorized to delete this post"))
    }

    // Hapus gambar jika ada
    if (post.image) {
      const imagePath = path.join(
        process.cwd(),
        "uploads",
        path.basename(post.image)
      )

      deleteFileIfExists(imagePath)
    }

    // Logika tambahan: Hapus semua gambar yang di-embed di dalam konten post
    const imgRegex = /\/uploads\/([^)>'"\s]+)/g
    for (const match of post.content.matchAll(imgRegex)) {
      const filePath = path.join(process.cwd(), "uploads", match[1])
      deleteFileIfExists(filePath)
    }

    // Hapus post dari database
    await post.destroy()

    res.json({ message: "Post deleted successfully!" })
  } catch (error) {
    next(error)
  }
}