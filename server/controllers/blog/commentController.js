import Comment from '../../models/commentModel.js';
import User from '../../models/userModel.js';
import Post from '../../models/postModel.js';
import { Op } from 'sequelize';

// Ekstraksi atribut yang sering digunakan ke konstanta untuk DRY
const AUTHOR_ATTRIBUTES = ['id', 'name'];

// Objek include dasar untuk penulis komentar
const commentIncludeAuthor = {
    model: User,
    as: 'author',
    attributes: AUTHOR_ATTRIBUTES,
};

export const getCommentsByPost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        // 🔥 PERBAIKAN UTAMA: Mendefinisikan include author untuk replies secara terpisah
        const replyAuthorInclude = {
            model: User,
            as: 'author', // Tetap menggunakan alias 'author' karena sudah didefinisikan di commentModel.js
            attributes: AUTHOR_ATTRIBUTES,
            // PENTING: Menambahkan duplicating: false untuk membantu mengatasi ambiguitas JOIN
            duplicating: false, 
        };

        const repliesInclude = {
            model: Comment,
            as: "replies",
            // Menggunakan include penulis yang diperbaiki
            include: [replyAuthorInclude], 
            order: [["createdAt", "ASC"]],
            duplicating: false, 
            // Tambahkan 'separate: true' untuk memaksa sub-query. Ini seringkali menjadi solusi terkuat.
            separate: true, 
        };

        // Hanya mengambil komentar utama (parentId: null) dan balasan tingkat pertama
        const comments = await Comment.findAll({
            where: {
                postId,
                parentId: { [Op.is]: null },
            },
            include: [
                commentIncludeAuthor, // Penulis komentar utama
                repliesInclude, // Balasan beserta penulisnya
            ],
            order: [['createdAt', 'DESC']],
            // Catatan: distinct: true harus diaktifkan untuk memastikan baris utama unik
            distinct: true, 
        });

        res.status(200).json(comments);
    } catch (error) {
        // Logging error yang jelas
        console.error("SERVER ERROR in getCommentsByPost:", error.message, error.stack);
        next(error);
    }
};


export const createComment = async (req, res, next) => {
    try {
        const { content, parentId } = req.body;
        const { postId } = req.params;
        // Asumsi req.user.id sudah disuntikkan oleh authMiddleware
        const authorId = req.user.id; 

        // Validasi Konten
        if (!content || content.trim().length === 0) {
            return res.status(400).json({ message: 'Komentar tidak boleh kosong!' });
        }

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan!' });
        }

        // Cek Keberadaan Komentar Induk (jika ini adalah balasan)
        if (parentId) {
            const parentComment = await Comment.findByPk(parentId);
            if (!parentComment) {
                return res.status(404).json({ message: 'Komentar induk tidak ditemukan!' });
            }
        }
        
        // Buat Komentar baru
        const newComment = await Comment.create({
            content,
            postId,
            authorId,
            parentId: parentId || null,
        });

        // Ambil data komentar yang baru dibuat beserta data penulisnya
        const commentWithAuthor = await Comment.findByPk(newComment.id, {
            include: [commentIncludeAuthor],
        });

        const message = parentId
            ? 'Balasan berhasil dibuat!'
            : 'Komentar berhasil dibuat!';

        res.status(201).json({
            message,
            comment: commentWithAuthor, // Kirim komentar yang sudah lengkap
        });
    } catch (error) {
        next(error);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        if (!content || content.trim().length === 0) {
            return res.status(400).json({ message: 'Konten komentar tidak boleh kosong!' });
        }

        const comment = await Comment.findByPk(id);

        if (!comment) {
            return res.status(404).json({ message: 'Komentar tidak ditemukan!' });
        }

        // Cek Izin
        if (comment.authorId !== userId) {
            return res.status(403).json({ message: 'Anda hanya bisa mengubah komentar Anda sendiri!' });
        }

        comment.content = content;
        await comment.save();

        // Ambil kembali data yang sudah diupdate beserta penulisnya
        const updatedComment = await Comment.findByPk(id, {
            include: [commentIncludeAuthor]
        });

        res.status(200).json({
            message: 'Komentar berhasil diperbarui!',
            comment: updatedComment,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        // Menggunakan findByPk lebih efisien daripada findAll jika hanya mencari 1 record
        const comment = await Comment.findByPk(id, {
            // Include Post hanya untuk mendapatkan authorId post
            include: [{ model: Post, attributes: ['authorId'] }]
        });

        if (!comment) {
            return res.status(404).json({ message: 'Komentar tidak ditemukan!' });
        }

        const isCommentAuthor = comment.authorId === userId;
        const isPostAuthor = comment.Post && comment.Post.authorId === userId;

        // Izin: Penulis Komentar ATAU Penulis Post dapat menghapus
        if (!isCommentAuthor && !isPostAuthor) {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk menghapus komentar ini!' });
        }

        // Hapus (akan menghapus balasan juga karena CASCADE)
        await comment.destroy();

        res.status(200).json({ message: 'Komentar berhasil dihapus!' });
    } catch (error) {
        next(error);
    }
};