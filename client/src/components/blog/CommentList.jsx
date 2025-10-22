import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaCheck, FaTimes, FaReply } from "react-icons/fa";
import CommentForm from "./CommentForm.jsx";

const CommentList = ({
    postId,
    comments,
    currentUser,
    postAuthorId,
    onEdit,
    onDelete,
    onReplyAdded,
    isAuthenticated
}) => {
    
    if (!comments || comments.length === 0) {
        return (
            <div className="text-center text-gray-500 py-6 bg-gray-50 rounded-lg">
                Belum ada komentar. Jadilah yang pertama!
            </div>
        );
    }

    // Komponen internal untuk setiap item komentar
    const CommentItem = ({ comment, isReply = false }) => {
        const [editingCommentId, setEditingCommentId] = useState(null);
        const [editContent, setEditContent] = useState("");
        const [replyingToId, setReplyingToId] = useState(null);

        const isCommentAuthor = currentUser && currentUser.id === comment.authorId;
        const isPostAuthor = currentUser && currentUser.id === postAuthorId;
        const canDelete = isCommentAuthor || isPostAuthor;
        const canEdit = isCommentAuthor;
        const isEditing = editingCommentId === comment.id;
        const isReplying = replyingToId === comment.id;

        const time = new Date(comment.createdAt).toLocaleTimeString("id-ID", {
            year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
        });

        const authorName = comment.author?.name || "Anonim";
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0284c7&color=ffffff&bold=true`;

        const handleStartEdit = () => {
            setEditingCommentId(comment.id);
            setEditContent(comment.content);
            setReplyingToId(null);
        };

        const handleSave = async () => {
            if (editContent.trim() === "") return;
            await onEdit(comment.id, editContent);
            setEditingCommentId(null);
        };

        const handleCancelEdit = () => {
            setEditingCommentId(null);
            setEditContent("");
        };
        
        const handleReplySuccess = (newReply) => {
            onReplyAdded(newReply); // Panggil fungsi dari parent (PostDetail)
            setReplyingToId(null); // Tutup form balasan
        };

        const authorLabel =
            comment.authorId === postAuthorId ? " (Penulis)" : isCommentAuthor ? " (Anda)" : "";

        return (
            <div className={`transition-all duration-300 ${isReply ? "ml-4 md:ml-8 border-l-2 border-sky-100 pl-4" : ""}`}>
                <div className="flex space-x-3 md:space-x-4 py-5 border-b border-gray-100 last:border-b-0">
                    <img src={avatar} alt={authorName} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-brand-navy">
                                    {authorName}
                                    <span className="text-xs text-gray-500 font-normal">{authorLabel}</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">{time}</p>
                            </div>
                            {(canEdit || canDelete) && !isEditing && (
                                <div className="flex gap-2">
                                    {canEdit && <button onClick={handleStartEdit} className="text-gray-400 hover:text-brand-blue" title="Edit"><FaEdit size={14} /></button>}
                                    {canDelete && <button onClick={() => onDelete(comment.id)} className="text-gray-400 hover:text-brand-pink" title="Hapus"><FaTrashAlt size={14} /></button>}
                                </div>
                            )}
                        </div>
                        {isEditing ? (
                            <div className="mt-3">
                                <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full border rounded-lg p-2 text-sm text-gray-700" rows={3} />
                                <div className="flex gap-2 mt-2">
                                    <button onClick={handleSave} className="flex items-center gap-1 bg-brand-blue text-white px-3 py-1.5 rounded-lg text-sm"><FaCheck size={12} /> Simpan</button>
                                    <button onClick={handleCancelEdit} className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm"><FaTimes size={12} /> Batal</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="mt-3 text-gray-700 whitespace-pre-line">{comment.content}</p>
                                {!isReply && isAuthenticated && (
                                    <button onClick={() => setReplyingToId(isReplying ? null : comment.id)} className="mt-3 flex items-center gap-1.5 text-sm text-brand-blue hover:underline font-medium">
                                        <FaReply size={12} /> Balas
                                    </button>
                                )}
                            </>
                        )}
                        {isReplying && (
                            <div className="mt-4">
                                <CommentForm
                                    postId={postId}
                                    parentId={comment.id}
                                    onCommentAdded={handleReplySuccess}
                                    isAuthenticated={isAuthenticated}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {/* Recursively render replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-2">
                        {comment.replies.map((reply) => (
                            <CommentItem 
                                key={reply.id} 
                                comment={reply} 
                                isReply={true} 
                                // Meneruskan properti penting ke balasan
                                currentUser={currentUser} 
                                postAuthorId={postAuthorId} 
                                onEdit={onEdit} 
                                onDelete={onDelete} 
                                onReplyAdded={onReplyAdded}
                                isAuthenticated={isAuthenticated}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-2">
            {comments.map((comment) => (
                <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    currentUser={currentUser} 
                    postAuthorId={postAuthorId} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                    onReplyAdded={onReplyAdded}
                    isAuthenticated={isAuthenticated}
                />
            ))}
        </div>
    );
};

export default CommentList;