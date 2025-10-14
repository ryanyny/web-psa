import React, { useState } from 'react';
import { FaTrashAlt, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

// Menerima prop baru: postAuthorId
const CommentList = ({ comments, currentUser, onDelete, onEdit, postAuthorId }) => { 
    
    // Menggunakan state untuk melacak komentar mana yang sedang diedit (penyederhanaan)
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');

    if (comments.length === 0) {
        return (
            <div className="text-center text-gray-500 py-6 bg-gray-50 rounded-lg">
                Belum ada komentar. Jadilah yang pertama berkomentar!
            </div>
        );
    }

    const CommentItem = ({ comment }) => {
        const isCommentAuthor = currentUser && currentUser.id === comment.authorId;
        
        // 💡 Logic BARU: Boleh menghapus jika Penulis Komentar ATAU Penulis Postingan
        const isPostAuthor = currentUser && currentUser.id === postAuthorId;
        const canDelete = isCommentAuthor || isPostAuthor;
        
        // Logic EDIT: Hanya Penulis Komentar yang boleh edit
        const canEdit = isCommentAuthor;
        const isEditing = editingCommentId === comment.id;

        const time = new Date(comment.createdAt).toLocaleTimeString('id-ID', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const authorName = comment.author?.name || 'Anonim';
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0284c7&color=ffffff&bold=true`;

        const handleStartEdit = () => {
            setEditingCommentId(comment.id);
            setEditContent(comment.content);
        };

        const handleSave = async () => {
            if (editContent.trim() === '') return;
            await onEdit(comment.id, editContent);
            setEditingCommentId(null);
        };

        const handleCancel = () => {
            setEditingCommentId(null);
            setEditContent('');
        };
        
        // Tambahkan tag visual untuk penulis blog
        const authorLabel = comment.authorId === postAuthorId 
            ? ' (Penulis)' 
            : (isCommentAuthor ? ' (Anda)' : '');

        return (
            <div className="flex space-x-4 py-5 border-b border-gray-100 last:border-b-0">
                <img
                    src={avatar}
                    alt={authorName}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-brand-navy">
                                {authorName}
                                <span className="text-xs text-gray-500 font-normal">{authorLabel}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{time}</p>
                        </div>

                        {/* Tombol Aksi: Tampil jika bisa mengedit ATAU bisa menghapus */}
                        {(canEdit || canDelete) && !isEditing && (
                            <div className="flex gap-2">
                                {/* Tombol Edit: Hanya tampil jika canEdit */}
                                {canEdit && (
                                    <button
                                        onClick={handleStartEdit}
                                        className="text-gray-400 hover:text-brand-blue transition-colors"
                                        title="Edit Komentar"
                                    >
                                        <FaEdit size={14} />
                                    </button>
                                )}
                                
                                {/* Tombol Hapus: Tampil jika canDelete */}
                                {canDelete && (
                                    <button
                                        onClick={() => onDelete(comment.id)}
                                        className="text-gray-400 hover:text-brand-pink transition-colors"
                                        title="Hapus Komentar"
                                    >
                                        <FaTrashAlt size={14} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Jika sedang mengedit */}
                    {isEditing ? (
                        <div className="mt-3">
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full border rounded-lg p-2 text-sm text-gray-700"
                                rows={3}
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-1 bg-brand-blue text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-brand-blue/90 transition-colors"
                                >
                                    <FaCheck size={12} /> Simpan
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-400 transition-colors"
                                >
                                    <FaTimes size={12} /> Batal
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-3 text-gray-700 whitespace-pre-line">{comment.content}</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} /> 
            ))}
        </div>
    );
};

export default CommentList;