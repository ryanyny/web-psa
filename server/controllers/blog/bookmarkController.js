import Bookmark from "../../models/bookmarkModel.js"
import Post from "../../models/postModel.js"
import User from "../../models/userModel.js"

export const toggleBookmark = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.postId)
        const userId = req.user?.id

        if (!userId) {
            return res.status(401).json({ message: "Not authorized!" })
        }

        const post = await Post.findByPk(postId)
        if (!post) {
            return res.status(404).json({ message: "Post not found!" })
        }

        const existing = await Bookmark.findOne({ where: { userId, postId } })
        if (existing) {
            await existing.destroy()
            return res.status(200).json({ bookmarked: false, message: "Bookmark removed! "})
        } else {
            await Bookmark.create({ userId, postId })
            return res.status(201).json({ bookmarked: true, message: "Bookmarked" })
        }
    } catch (error) {
        next(error)
    }
}

export const getBookmarksForPost = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.postId)
        const userId = req.user?.id || null

        const total = await Bookmark.count({ where: { postId } })

        let userBookmarked = false
        if (userId) {
            const b = await Bookmark.findOne({ where: { postId, userId } })
            userBookmarked = !!b
        }

        res.json({ totalBookmarks: total, userBookmarked })
    } catch (error) {
        next(error)
    }
}

export const getUserBookmarks = async (req, res, next) => {
    try {
        const userId = req.user?.id
        if (!userId) return res.status(401).json({ message: "Not authorized!" })

        const bookmarks = await Bookmark.findAll({
            where: { userId },
            include: [
                {
                    model: Post,
                    include: [
                        {
                            model: User,
                            as: "author",
                            attributes: ["id", "name"]
                        },
                    ],
                },
            ],
            order: [["createdAt", "DESC"]]
        })

        const posts = bookmarks.map((b) => b.Post)
        res.json(posts)
    } catch (error) {
        next(error)
    }
}