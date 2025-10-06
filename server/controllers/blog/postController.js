import Post from "../../models/postModel.js"
import User from "../../models/userModel.js"

// ========================
// CREATE POST
// ========================
export const createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body
        // validasi input
        if (!title || !content) {
            res.status(400)
            throw new Error("Please fill in all fields!")
        }

        // Buat post baru, author diambil dari req.user (authMiddleware)
        const post = await Post.create({
            title,
            content,
            image: req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null,
            authorId: req.user.id,
        })

        res.status(201).json({
            message: "Post created successfully!",
            post,
        })
    } catch (error) {
        next(error)
    }
}

// ========================
// GET ALL POSTS
// ========================
export const getAllPosts =  async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                as: "author",
                attributes: ["id", "name", "email"], // Tampilkan nama author
            },
            order: [["createdAt", "DESC"]] // Urutkan dari terbaru
        })   
        
        res.json(posts)
    } catch (error) {
        next(error)
    }
}

// ========================
// GET POST BY ID
// ========================
export const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: {
                model: User,
                as: "author",
                attributes: ["id", "name", "email"],
            },
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

// ========================
// UPDATE POST
// ========================
export const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.id)
        if (!post) {
            res.status(404)
            throw new Error("Post not found!")
        }

        // Cek apakah user adalah author
        if (post.authorId !== req.user.id) {
            res.status(403)
            throw new Error("Not authorized to update this post!")
        }

        // Update field post
        post.title = req.body.title || post.title
        post.content = req.body.content || post.content
        post.excerpt = req.body.excerpt || post.excerpt
        if (req.file) {
            post.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        }

        await post.save()
        res.json({
            message: "Post updated successfully!",
            post,
        })
    } catch (error) {
        next(error)
    }
}

// ========================
// DELETE POST
// ========================
export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.id)
        if (!post) {
            res.status(400)
            throw new Error("Post not found!")
        }

        // Cek apakah user adalah author
        if (post.authorId !== req.user.id) {
            res.status(403)
            throw new Error("Not authorized to delete this post")
        }

        await post.destroy()
        res.json({ message: "Post deleted successfully!" })
    } catch (error) {
        next(error)
    }
}