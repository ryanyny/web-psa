import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; 

const CommentList = ({ comments, currentUser, onDelete }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6 bg-gray-50 rounded-lg">
        Belum ada komentar. Jadilah yang pertama berkomentar!
      </div>
    );
  }

  const CommentItem = ({ comment }) => {
    // 💡 Logic: Hanya pemilik komentar yang bisa menghapus
    const canDelete = currentUser && currentUser.id === comment.authorId; 
    
    // 💡 Format waktu
    const time = new Date(comment.createdAt).toLocaleTimeString('id-ID', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    // 💡 PERBAIKAN: Gunakan UI-Avatars secara default, karena profilePicture tidak ada
    // Kita pastikan nama pengguna ada (jika tidak ada, gunakan 'Anon')
    const authorName = comment.author?.name || 'Anonim';
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0284c7&color=ffffff&bold=true`;

    return (
      <div className="flex space-x-4 py-5">
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
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{time}</p>
            </div>
            
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
          <p className="mt-3 text-gray-700 whitespace-pre-line">{comment.content}</p>
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