import { Op } from "sequelize"
import Comment from "../../models/commentModel.js"
import User from "../../models/userModel.js"
import Post from "../../models/postModel.js"

const AUTHOR_ATTRIBUTES = ["id", "name"]

const commentIncludeAuthor = {
    model: User,
    as: "author",
    attributes: AUTHOR_ATTRIBUTES,
}

export const createComment = async (req, res, next) => {
    try {
        const { content, parentId } = req.body
        const { postId } = req.params
        const authorId = req.user.id

        if (!content || content.trim().length === 0) {
            res.status(400)
            throw new Error("Comments cannot be empty!")
        }

        const post = await Post.findByPk(postId)
        if (!post) {
            res.status(404)
            throw new Error("Post not found!")
        }

        if (parentId) {
            const parentComment = await Comment.findByPk(parentId)

            if (!parentComment) {
                res.status(404)
                throw new Error("Parent comment not found!")
            }
        }

        const newComment = await Comment.create({
            content,
            postId,
            authorId,
            parentId: parentId || null,
        })

        const commentWithAuthor = await Comment.findByPk(newComment.id, {
            include: [commentIncludeAuthor],
        })

        const message = parentId
            ? "Reply created successfully!"
            : "Comment created successfully!";

        res.status(201).json({
            message,
            comment: commentWithAuthor,
        })
    } catch (error) {
        next(error)
    }
}

export const getCommentsByPost = async (req, res, next) => {
    try {
        const { postId } = req.params

        const replyAuthorInclude = {
            model: User,
            as: "author",
            attributes: AUTHOR_ATTRIBUTES,
            duplicating: false,
        }

        const repliesInclude = {
            model: Comment,
            as: "replies",
            include: [replyAuthorInclude],
            order: [["createdAt", "ASC"]],
            duplicating: false,
            separate: true,
        }

        const comments = await Comment.findAll({
            where: {
                postId,
                parentId: { [Op.is]: null },
            },
            include: [
                commentIncludeAuthor,
                repliesInclude,
            ],
            order: [["createdAt", "DESC"]],
            distinct: true,
        })

        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const { content } = req.body
        const userId = req.user.id

    if (!content || content.trim().length === 0) {
        res.status(400)
        throw new Error("Comments cannot be empty!")
    }

    const comment = await Comment.findByPk(id)

    if (!comment) {
        res.status(404)
        throw new Error("Comment not found!")
    }

    if (comment.authorId !== userId) {
        res.status(403)
        throw new Error("You can only change your own comments!")
    }

    comment.content = content

    await comment.save()

    const updatedComment = await Comment.findByPk(id, {
        include: [commentIncludeAuthor],
    })

    res.status(200).json({
        message: "Comment updated successfully!",
        comment: updatedComment,
    })
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.user.id

        const comment = await Comment.findByPk(id, {
            include: [{ model: Post, attributes: ["authorId"] }],
        })

        if (!comment) {
            res.status(404)
            throw new Error("Comment not found!")
        }

        const isCommentAuthor = comment.authorId === userId
        const isPostAuthor = comment.Post && comment.Post.authorId === userId

        if (!isCommentAuthor && !isPostAuthor) {
            res.status(403)
            throw new Error("You do not have permission to delete this comment!")
        }

        await comment.destroy()

        res.status(200).json({ message: "Comment deleted successfully!" })
    } catch (error) {
        next(error)
    }
}