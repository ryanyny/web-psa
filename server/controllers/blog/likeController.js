import Like from "../../models/likeModel.js"
import Post from "../../models/postModel.js"

// --- Controller: TOGGLE LIKE (ADD / DELETE) ---
export const toggleLike = async (req, res, next) => {
    try {
        const { id: postId } = req.params
        const userId = req.user.id

        // Cek: Pastikan post yang dibookmark ada
        const post = await Post.findByPk(postId)
        if (!post) {
            res.status(404)
            throw new Error("Post not found!")
        }

        // Cek: Apakah like sudah ada untuk user dan post ini
        const existing = await Like.findOne({ where: { userId, postId } })
        if (existing) {
            // Jika sudah ada: Hapus
            await existing.destroy()
            return res
                .status(200)
                .json({ liked: false, message: "Post unliked!" })
        } else {
            // Jika sudah ada: Buat
            await Like.create({ userId, postId })
            return res
                .status(201)
                .json({ liked: true, message: "Post liked!" })
        }
    } catch (error) {
        next(error)
    }
}

// --- Controller: GET LIKES FOR POST ---
export const getLikesForPost = async (req, res, next) => {
    try {
        const { id: postId } = req.params
        const userId = req.user?.id || null

        // Hitung total like untuk post ini
        const totalLikes = await Like.count({ where: { postId } })

        // Cek apakah user sudah me-like post ini
        const userLiked = userId
            ? !!(await Like.findOne({ where: { postId, userId } }))
            : false

        res.json({ totalLikes, userLiked })
    } catch (error) {
        next(error)
    }
}