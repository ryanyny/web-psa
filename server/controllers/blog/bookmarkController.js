import sequelize from "../../config/database.js"
import Bookmark from "../../models/bookmarkModel.js"
import Category from "../../models/categoryModel.js"
import Post from "../../models/postModel.js"
import User from "../../models/userModel.js"

// --- Controller: TOGGLE BOOKMARK (ADD / DELETE) --- 
export const toggleBookmark = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.postId)
        const userId = req.user?.id

        // Cek autentikasi: Hanya user yang sudah login yang bisa membuat atau menghapus bookmark
        if (!userId) {
            res.status(401)
            throw new Error("Not authorized to bookmark this post!")
        }

        // Cek: Pastikan post yang dibookmark ada
        const post = await Post.findByPk(postId)
        if (!post) {
            res.status(404)
            throw new Error("Post not found!")
        }

        // Cek: Apakah bookmark sudah ada untuk user dan post ini
        const existing = await Bookmark.findOne({ where: { userId, postId } })
        if (existing) {
            // Jika sudah ada: Hapus
            await existing.destroy()
            return res
                .status(200)
                .json({ bookmarked: false, message: "Bookmark removed! " })
        } else {
            // Jika belum ada: Buat
            await Bookmark.create({ userId, postId })
            return res
                .status(201)
                .json({ bookmarked: true, message: "Bookmarked" })
        }
    } catch (error) {
        next(error)
    }
}

// --- Controller: GET BOOKMARKS FOR POST ---
export const getBookmarksForPost = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.postId)
        const userId = req.user?.id || null

        // Hitung total bookmark untuk post ini
        const totalBookmarks = await Bookmark.count({ where: { postId } })

        // Cek apakah user sudah me-bookmark post ini
        const userBookmarked = userId
            ? !!(await Bookmark.findOne({ where: { postId, userId } }))
            : false

        res.json({ totalBookmarks, userBookmarked })
    } catch (error) {
        next(error)
    }
}

// --- Controller: GET ALL BOOKMARKED POSTS BY USER ---
export const getUserBookmarks = async (req, res, next) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            res.status(401)
            throw new Error("Not authorized to get bookmarked post!")
        }

        const user = await User.findByPk(userId, {
            include: {
                model: Post,
                as: "bookmarks",
                attributes: {
                    include: [
                        [ 
                            sequelize.fn(
                                "COUNT",
                                sequelize.fn("DISTINCT", sequelize.col("bookmarks->likedBy.id"))
                            ),
                            "totalLikes",
                        ],
                    ],
                },
                include: [
                    {
                        model: User,
                        as: "author",
                        attributes: ["id", "name"],
                    },
                    {
                        model: User,
                        as: "likedBy",
                        attributes: [],
                        through: { attributes: [] },
                        required: false,
                    },
                    {
                        model: Category,
                        as: "categories",
                        attributes: ["id", "name"],
                        through: { attributes: [] },
                    },
                ],
                through: { attributes: [] },
            },
            group: [
                "User.id",
                "bookmarks.id",
                "bookmarks->author.id",
                "bookmarks->likedBy.id",
                "bookmarks->categories.id",
            ],
            order: [[
                {
                    model: Post,
                    as: "bookmarks",
                },
                "createdAt", "DESC",
            ]],
        })

        const posts = user?.bookmarks || []

        res.json(posts)
    } catch (error) {
        next(error)
    }
}