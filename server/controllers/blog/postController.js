import fs from "fs";
import path from "path";
import Post from "../../models/postModel.js";
import User from "../../models/userModel.js";
import Category from "../../models/categoryModel.js";

// Helper untuk hapus file
const deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// ========================
// CREATE POST
// ========================
export const createPost = async (req, res, next) => {
  try {
    const { title, content, categories } = req.body;
    // validasi input
    if (!title || !content) {
      res.status(400);
      throw new Error("Please fill in all fields!");
    }

    // Buat post baru, author diambil dari req.user (authMiddleware)
    const post = await Post.create({
      title,
      content,
      image: req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : null,
      authorId: req.user.id,
    });

    // Assign kategori jika ada
    if (categories) {
      let categoryIds = [];

      if (Array.isArray(categories)) {
        categoryIds = categories.map((id) => parseInt(id));
    } else {
        categoryIds = categories.split(",").map((id) => parseInt(id));
    }

    // Gunakan post.setCategories() untuk Many-to-Many
    await post.setCategories(categoryIds);
    }

    res.status(201).json({
      message: "Post created successfully!",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// ========================
// GET ALL POSTS
// ========================
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
            model: User,
            as: "author",
            attributes: ["id", "name", "email"], // Tampilkan nama author
        },
        {
            model: Category,
            as: "categories",
            attributes: ["id", "name"],
            through: { attributes: [] },
        },
      ],
      order: [["createdAt", "DESC"]], // Urutkan dari terbaru
    });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// ========================
// GET POST BY ID
// ========================
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
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
    });
    if (!post) {
      res.status(400);
      throw new Error("Post not found!");
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

// ========================
// UPDATE POST
// ========================
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error("Post not found!");
    }

    // Cek apakah user adalah author
    if (post.authorId !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized to update this post!");
    }

    // Hapus cover image lama jika diganti
    if (req.file && post.image) {
      const oldImagePath = path.join(
        process.cwd(),
        "uploads",
        path.basename(post.image)
      );

      deleteFileIfExists(oldImagePath);
    }

    // Update field post
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.excerpt = req.body.excerpt || post.excerpt;
    if (req.file) {
      post.image = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    await post.save();

    // Update kategori jika dikirim
const { categories } = req.body
if (categories) {
    let categoryIds = []

    if (Array.isArray(categories)) {
        categoryIds = categories.map((id) => parseInt(id))
    } else {
        categoryIds = categories.split(",").map((id) => parseInt(id))
    }

    await post.setCategories(categoryIds)
}
    res.json({
      message: "Post updated successfully!",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// ========================
// DELETE POST
// ========================
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(400);
      throw new Error("Post not found!");
    }

    // Cek apakah user adalah author
    if (post.authorId !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized to delete this post");
    }

    // Hapus cover image jika ada
    if (post.image) {
      const imagePath = path.join(
        process.cwd(),
        "uploads",
        path.basename(post.image)
      );

      deleteFileIfExists(imagePath);
    }

    // Cari semua gambar dari konten HTML
    const imgRegex = /\/uploads\/([^)>'"\s]+)/g;
    const matches = [...post.content.matchAll(imgRegex)];

    for (const match of matches) {
      const fileName = match[1];
      const filePath = path.join(process.cwd(), "uploads", fileName);

      deleteFileIfExists(filePath);
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    next(error);
  }
};