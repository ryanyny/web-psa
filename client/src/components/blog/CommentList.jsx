import { useState } from "react"
import { Trash2, Edit3, Check, X, Reply } from "lucide-react"
import CommentForm from "./CommentForm.jsx"

const CommentList = ({
    postId,
    comments,
    currentUser,
    postAuthorId,
    onEdit,
    onDelete,
    onReplyAdded,
    isAuthenticated,
}) => {
    // Tampilan jika tidak ada komentar
    if (!comments || comments.length === 0) {
        return (
            <div className="text-center text-gray-500 py-6 bg-gray-50 rounded-lg">
                Belum ada komentar. Jadilah yang pertama!
            </div>
        )
    }

    const CommentItem = ({ comment, isReply = false }) => {
        const [editingCommentId, setEditingCommentId] = useState(null)
        const [editContent, setEditContent] = useState("")
        const [replyingToId, setReplyingToId] = useState(null)

        const isCommentAuthor = currentUser && currentUser.id === comment.authorId
        const isPostAuthor = currentUser && currentUser.id === postAuthorId

        const canDelete = isCommentAuthor || isPostAuthor
        const canEdit = isCommentAuthor

        const isEditing = editingCommentId === comment.id
        const isReplying = replyingToId === comment.id

        // Format waktu
        const time = new Date(comment.createdAt).toLocaleTimeString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })

        // Pembuatan avatar default menggunakan UI Avatars
        const authorName = comment.author?.name || "Anonim";
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            authorName
        )}&background=0284c7&color=ffffff&bold=true`

        // --- Handler aksi UI ---
        const handleStartEdit = () => {
            setEditingCommentId(comment.id)
            setEditContent(comment.content)
            setReplyingToId(null)
        }

        const handleSave = async () => {
            if (editContent.trim() === "") return
            await onEdit(comment.id, editContent)
            setEditingCommentId(null)
        }

        const handleCancelEdit = () => {
            setEditingCommentId(null);
            setEditContent("");
        }

        const handleReplySuccess = (newReply) => {
            onReplyAdded(newReply)
            setReplyingToId(null)
        }

        // Label tambahan untuk penulis postingan atau komentar
        const authorLabel = comment.authorId === postAuthorId ? " (Penulis)" : isCommentAuthor ? " (Anda)" : ""

        // --- Render utama ---
        return (
            <div
                className={`transition-all duration-300 ${
                    isReply ? "ml-4 md:ml-8 border-l-2 border-sky-100 pl-4" : ""
                }`}
            >
                <div className="flex space-x-3 md:space-x-4 py-5 border-b border-gray-100 last:border-b-0">
                    {/* Display avatar */}
                    <img
                        src={avatar}
                        alt={authorName}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                    />

                    <div className="flex-1">
                        {/* Nama penulis & waktu */}
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-brand-navy">
                                    {authorName}
                                    <span className="text-xs text-gray-500 font-normal">{authorLabel}</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">{time}</p>
                            </div>
                            
                            {/* Tombol aksi (ubah & hapus) */}
                            {(canEdit || canDelete) && !isEditing && (
                                <div className="flex gap-2">
                                    {canEdit && (
                                        <button
                                            onClick={handleStartEdit}
                                            className="text-gray-400 hover:text-brand-blue"
                                            title="Edit"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                    )}
                                    
                                    {canDelete && (
                                        <button
                                            onClick={() => onDelete(comment.id)}
                                            className="text-gray-400 hover:text-brand-pink"
                                            title="Hapus"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mode pengeditan (textarea, simpan, & batal) */}
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
                                        className="flex items-center gap-1 bg-brand-blue text-white px-3 py-1.5 rounded-lg text-sm"
                                    >
                                        <Check size={12} /> Simpan
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm"
                                    >
                                        <X size={12} /> Batal
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Mode tampilan normal
                            <>
                                <p className="mt-3 text-gray-700 whitespace-pre-line">{comment.content}</p>
                                    {!isReply && isAuthenticated && (
                                        <button
                                            onClick={ () => setReplyingToId(isReplying ? null : comment.id) }
                                            className="mt-3 flex items-center gap-1.5 text-sm text-brand-blue hover:underline font-medium"
                                        >
                                            <Reply size={12} /> Balas
                                        </button>
                                    )}
                            </>
                        )}

                        {/* Form balasan (ditampilkan jika isReplying true) */}
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

                {/* --- Logika rekrusif untuk balasan */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-2">
                        {comment.replies.map((reply) => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                isReply={true}
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
        )
    }
    
    // --- Render komentar tingkat atas ---
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
    )
}

export default CommentList