import Comment from '../../models/commentModel.js'
import User from '../../models/userModel.js'
import Post from '../../models/postModel.js'

const commentAttributes = {
    attributes: ["id", "content", "createdAt", "authorId"],
    include: [{
        model: User,
        as: "author",
        attributes: ["id", "name"],
    }]
}

export const getCommentsByPost = async (req, res, next) => {
    try {
        const postId = req.params.postId

        const comments = await Comment.findAll({
            where: { postId: postId },
            ...commentAttributes,
            order: [["createdAt", "DESC"]],
        })

        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

export const createComment = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Not authorized to create a comment!" })
    }

    const { content } = req.body
    const postId = req.params.postId
    const authorId = req.user.id

    if (!content || content.trim().length === 0) {
        return res.status(400).json({ message: "Comments cannot be empty!" })
    }

    try {
        const newComment = await Comment.create({
            postId,
            authorId,
            content,
        })

        const commentWithAuthor = await Comment.findByPk(newComment.id, commentAttributes)

        res.status(201).json({
            message: "Comment created successfully!",
            comment: commentWithAuthor,
        })
    } catch (error) {
        next(error)
    }
}

export const updateComment = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Not authorized to update a comment!" })
    }

    const id = req.params.id
    const userId = req.user.id
    const { content } = req.body

    if (!content || content.trim().length === 0) {
        return res.status(400).json({ message: "Comments cannot be empty!" })
    }

    try {
        const comment = await Comment.findByPk(id)

        if (!comment) {
            return res.status(404).json({ message: "Comment not found!" })
        }

        if (comment.authorId !== userId) {
            return res.status(403).json({ message: "You can only update your own comments!" })
        }

        comment.content = content
        await comment.save()
        const updatedComment = await Comment.findByPk(id, commentAttributes)

        res.status(200).json({
            message: "Comment updated successfully!",
            comment: updatedComment,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Not authorized to delete a comment!" })
    }

    const id = req.params.id
    const userId = req.user.id

    try {
        const comment = await Comment.findByPk(id)

        if (!comment) {
            return res.status(404).json({ message: "Comment not found!" })
        }

        const isCommentAuthor = comment.authorId === userId

        const post = await Post.findByPk(comment.postId, {
            attributes: ['authorId']
        })

        const isPostAuthor = post && post.authorId === userId

        if (!isCommentAuthor && !isPostAuthor) {
            return res.status(403).json({ message: "You can only delete your own comments or comments on your post!" })
        }

        await comment.destroy()

        res.status(200).json({ message: "Comment deleted successfully!" })
    } catch (error) {
        next(error)
    }
}