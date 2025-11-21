import { useEffect, useState, useContext, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Heart, Bookmark } from "lucide-react"
import { posts, categories, comments, likes, bookmarks } from "../../http/index.js"
import { usePostLikes, usePostBookmarks } from "../../hooks/usePostInteraction.js"
import { updateNestedComment, filterNestedComments } from "../../utils/commentUtils.js"
import { formatIndonesianDate } from "../../utils/formatters.js"
import AuthContext from "../../context/AuthContext.jsx"
import PostCard from "../../components/blog/PostCard.jsx"
import ReadingProgress from "../../components/blog/ReadingProgress.jsx"
import CommentForm from "../../components/blog/CommentForm.jsx"
import CommentList from "../../components/blog/CommentList.jsx"
import ConfirmModal from "../../components/shared/confirmModal.jsx"

const PostDetail = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const { user } = useContext(AuthContext)

  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [commentsList, setCommentsList] = useState([])
  const [commentToDeleteId, setCommentToDeleteId] = useState(null)
  const [showPostModal, setShowPostModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)

  // --- Hook interaksi like & bookmark ---
  const {
    likeCount,
    userLiked,
    handleToggleLike,
    setLikeCount,
    setUserLiked,
  } = usePostLikes(id, user, 0, false)

  const {
    bookmarkCount,
    userBookmarked,
    handleToggleBookmark,
    setBookmarkCount,
    setUserBookmarked,
  } = usePostBookmarks(id, user, 0, false)

  // --- Fungsi pengambilan data ---
  const fetchPostDetail = useCallback(async () => {
    setLoading(true)

    const fetchers = [
      posts.getById(id),
      comments.getCommentsByPost(id).then(res => res.data),
      likes.get(id).then(res => res.data),
      bookmarks.getSummary(id).then(res => res.data),
    ]

    try {
      const [postRes, commentsData, likesData, bookmarksData] = await Promise.all(fetchers)

      setPost(postRes.data)
      setCommentsList(commentsData)
      setLikeCount(likesData.totalLikes ?? 0)
      setUserLiked(likesData.userLiked ?? false)
      setBookmarkCount(bookmarksData.totalBookmarks ?? 0)
      setUserBookmarked(bookmarksData.userBookmarked ?? false)

      // Ambil postingan terkait
      if (postRes.data.categories && postRes.data.categories.length > 0) {
        const primaryCategoryId = postRes.data.categories[0].id
        const relatedRes = await categories.getPosts(primaryCategoryId)
        const filteredRelated = relatedRes.data
          .filter((p) => String(p.id) !== id)
          .slice(0, 3)
        setRelatedPosts(filteredRelated)
      }
    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 404) {
        setPost(null)
      }
    } finally {
      setLoading(false)
      setCommentsLoading(false)
    }
  }, [id, setLikeCount, setUserLiked, setBookmarkCount, setUserBookmarked])

  useEffect(() => {
    fetchPostDetail()
  }, [id, fetchPostDetail])

  // --- Handler aksi post (hapus) ---
  const handleDeletePost = async () => {
    try {
      await posts.remove(id);
      toast.success("Blog berhasil dihapus!")

      nav("/blog/");
    } catch {
      toast.error("Blog gagal dihapus!")
    } finally {
      setShowPostModal(false)
    }
  }

  // --- Handler aksi komentar (tambah, balas, edit, hapus) ---
  const handleCommentAdded = (newComment) => {
    const commentWithRepliesInit = { ...newComment, replies: [] }
    setCommentsList((prev) => [commentWithRepliesInit, ...prev])
  }

  const handleReplyAdded = (newReply) => {
    setCommentsList((prevList) =>
      prevList.map((comment) => {
        if (comment.id === newReply.parentId) {
          const updatedReplies = comment.replies? [...comment.replies, newReply] : [newReply];
          return { ...comment, replies: updatedReplies }
        }

        return comment
      })
    );
  };

  const handleEditComment = useCallback(async (commentId, newContent) => {
    try {
      const res = await comments.update(commentId, { content: newContent })
      const updatedContent = res.data.comment.content

      toast.success("Komentar berhasil diperbarui!")

      setCommentsList((prevList) =>
        updateNestedComment(prevList, commentId, updatedContent)
      )
    } catch (error) {
      console.error("Gagal mengedit komentar:", error)
      toast.error(error.response?.data?.message || "Gagal memperbarui komentar!")
    }
  }, [])

  const handleOpenDeleteCommentModal = useCallback((commentId) => {
    setCommentToDeleteId(commentId)
    setShowCommentModal(true)
  }, [])

  const confirmDeleteComment = useCallback(async () => {
    if (!commentToDeleteId) return

    try {
      await comments.remove(commentToDeleteId)
      toast.success("Komentar berhasil dihapus!")

      setCommentsList((prevList) =>
        filterNestedComments(prevList, commentToDeleteId)
      )
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menghapus komentar.")
    } finally {
      setShowCommentModal(false)
      setCommentToDeleteId(null)
    }
  }, [commentToDeleteId])

  // Tampilan loading
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading...
      </div>
    )

  // Tampilan saat postingan tidak ditemukan
  if (!post)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400 text-lg italic">
        Postingan tidak ditemukan
      </div>
    )

  // --- Variabel turunan (derived state) ---
  const isAuthor = user && user.id === Number(post.author?.id || post.author)
  const isAuthenticated = !!user
  const postAuthorId = post.author?.id || post.author
  // Hitung total komentar (utama + balasan)
  const totalCommentsCount = commentsList.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  )

  // --- Render utama ---
  return (
    <div className="container mx-auto px-4 py-5 md:py-5">
      {/* Indikator progress membaca */}
      <ReadingProgress />

      <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10">
        {/* Tombol aksi (edit & hapus) hanya untuk Penulis */}
        {isAuthor && (
          <div className="flex gap-3 mb-6 justify-end">
            <Link
              to={`/blog/edit/${post.id}`}
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Ubah
            </Link>
            <button
              onClick={() => setShowPostModal(true)}
              className="px-4 py-2 bg-brand-pink text-white rounded-lg font-medium hover:bg-brand-pink/90 transition"
            >
              Hapus
            </button>
          </div>
        )}

        {/* Judul post */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-tight">
          {post.title}
        </h1>

        {/* Meta data post */}
        <p className="text-md text-gray-600 mb-6 border-b pb-4 border-gray-100">
          oleh{" "}
          <span className="font-medium">
            {post.author?.name || "Penulis Tak Dikenal"}
          </span>{" "}
          —{" "}
          <span className="font-light">
            {formatIndonesianDate(post.createdAt)}
          </span>
        </p>
        
        {/* Kategori post */}
        {post.categories?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 mb-6">
            {post.categories.map((c) => (
              <span
                key={c.id}
                className="px-3 py-1 text-sm font-semibold rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/30"
              >
                {c.name.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        {/* Gambar utama */}
        {post.image && (
          <div className="flex justify-center my-8">
            <img
              src={post.image}
              alt={post.title}
              className="max-w-4xl w-full aspect-[4/3] sm:aspect-video rounded-xl shadow-xl object-cover"
            />
          </div>
        )}

        {/* Konten post */}
        <div
          className="mt-10 prose prose-lg quill-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-8 flex items-center gap-3">
          {/* Tombol interaksi like */}
          <button
            onClick={handleToggleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              userLiked
                ? "bg-brand-blue text-white border-brand-blue"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Heart
              size={20}
              className={`${userLiked ? "fill-current text-white" : ""}`}
            />
            <span>{likeCount}</span>
          </button>

          {/* Tombol interaksi bookmark */}
          <button
            onClick={handleToggleBookmark}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              userBookmarked
                ? "bg-yellow-500 text-white border-yellow-500"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Bookmark
              size={18}
              className={`${userBookmarked ? "fill-current text-white" : ""}`}
            />
            <span>{bookmarkCount}</span>
          </button>
        </div>
        
        {/* Postingan terkait */}
        {relatedPosts.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-5 tracking-tight text-center">
              Postingan Terkait Lainnya
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
            <div className="flex justify-center mt-5">
              <Link
                to="/blog/"
                className="px-6 py-3 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition duration-300 border border-blue-200"
              >
                Lihat Semua Postingan
              </Link>
            </div>
          </div>
        )}

        {/* Komentar */}
        <div className="mt-16 pt-8 max-w-full md:wax-w-3xl mx-auto border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-8 tracking-tight">
            Komentar ({totalCommentsCount})
          </h2>

          <CommentForm
            postId={id}
            onCommentAdded={handleCommentAdded}
            isAuthenticated={isAuthenticated}
          />

          <div className="mt-10">
            {commentsLoading ? (
              <div className="text-center text-gray-500 py-6">
                Memuat komentar...
              </div>
            ) : (
              <CommentList
                postId={id}
                comments={commentsList}
                currentUser={user}
                postAuthorId={postAuthorId}
                onEdit={handleEditComment}
                onDelete={handleOpenDeleteCommentModal}
                onReplyAdded={handleReplyAdded}
                isAuthenticated={isAuthenticated}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal konfirmasi hapus post */}
      <ConfirmModal
        open={showPostModal}
        title="Yakin mau hapus blog ini?"
        message="Aksi ini tidak bisa dibatalkan setelah dilakukan."
        confirmText="Hapus"
        cancelText="Batal"
        onCancel={() => setShowPostModal(false)}
        onConfirm={handleDeletePost}
      />

      {/* Modal konfirmasi hapus komentar */}
      <ConfirmModal
        open={showCommentModal}
        title="Yakin mau hapus komentar ini?"
        message="Aksi ini tidak bisa dibatalkan setelah dilakukan."
        confirmText="Hapus"
        cancelText="Batal"
        onCancel={() => setShowCommentModal(false)}
        onConfirm={confirmDeleteComment}
      />
    </div>
  )
}

export default PostDetail