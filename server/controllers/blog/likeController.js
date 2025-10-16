import Like from "../../models/likeModel.js"
import Post from "../../models/postModel.js"

export const toggleLike = async (req, res, next) => {
    try {
        const { id: postId } = req.params
        const userId = req.user.id

        const post = await Post.findByPk(postId)
        if (!post) return res.status(404).json({ message: "Post not found! "})

        const existingLike = await Like.findOne({ where: { userId, postId }})
        if (existingLike) {
            await existingLike.destroy()
            return res.json({ liked: false, message: "Post unliked!" })
        } else {
            await Like.create({ userId, postId })
            return res.json({ liked: true, message: "Post liked!" })
        }
    } catch (error) {
        next(error)
    }
}

export const getLikes = async (req, res, next) => {
    try {
        const { id: postId } = req.params
        const userId = req.user?.id || null

        const totalLikes = await Like.count({ where: { postId }})
        const userLiked = userId
            ? !!(await Like.findOne({ where: { postId, userId }}))
            : false
        
        res.json({ totalLikes, userLiked })
    } catch (error) {
        next(error)
    }
}