import Post from "../models/postModel.js"

// ========================
// CREATE POST
// ========================
export const createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body
        // validasi input
        if (!title || !content) {
            res.status(400)
            throw new Error("Title and content are required!")
        }

        // Buat post baru, author diambil dari req.user (authMiddleware)
        const post = await Post.create({
            title,
            content,
            coverImage: req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null,
            author: req.user._id,
        })

        res.status(201).json(post)
    } catch (error) {
        next(error)
    }
}

// ========================
// GET ALL POSTS
// ========================
export const getAllPosts =  async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate("author", "username") // Tampilkan username author
            .sort({ createdAt: -1 })        // Urutkan dari terbaru
        
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
        const post = await Post.findById(req.params.id).populate("author", "username")
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
        const post = await Post.findById(req.params.id)
        if (!post) {
            res.status(404)
            throw new Error("Post not found!")
        }

        // Cek apakah user adalah author
        if (post.author.toString() !== req.user._id.toString()) {
            res.status(403)
            throw new Error("Not authorized to update this post!")
        }

        // Update field post
        const { title, content, coverImage } = req.body
        post.title = title || post.title
        post.content = content || post.content
        if (req.file) {
            post.coverImage = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        }

        const updated = await post.save()
        res.json(updated)
    } catch (error) {
        next(error)
    }
}

// ========================
// DELETE POST
// ========================
export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            res.status(400)
            throw new Error("Post not found!")
        }

        // Cek apakah user adalah author
        if (post.author.toString() !== req.user._id.toString()) {
            res.status(403)
            throw new Error("Not authorized to delete this post")
        }

        await post.deleteOne()
        res.json({ message: "Post deleted!" })
    } catch (error) {
        next(error)
    }
}