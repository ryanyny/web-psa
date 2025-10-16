import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { posts, categories, comments, likes } from "../../http/index.js";
import AuthContext from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";
import PostCard from "../../components/blog/PostCard.jsx";
import ReadingProgress from "../../components/blog/ReadingProgress.jsx";
import CommentForm from "../../components/blog/CommentForm.jsx";
import CommentList from "../../components/blog/CommentList.jsx";

const PostDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);

  // === FETCH KOMENTAR ===
  const fetchComments = useCallback(async () => {
    if (!id) return;
    setCommentsLoading(true);
    try {
      const res = await comments.getCommentsByPost(id);
      setCommentsList(res.data);
    } catch (error) {
      console.error("Gagal memuat komentar:", error);
    } finally {
      setCommentsLoading(false);
    }
  }, [id]);

  // === FETCH LIKES ===
  const fetchLikes = useCallback(async () => {
    if (!id) return;
    try {
      const res = await likes.get(id);
      setLikeCount(res.data.totalLikes);
      setUserLiked(res.data.userLiked);
    } catch (error) {
      console.error("Gagal memuat data likes:", error);
    }
  }, [id]);

  // === FETCH POST + RELATED ===
  const fetchPostData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await posts.getById(id);
      setPost(res.data);

      if (res.data.categories && res.data.categories.length > 0) {
        const primaryCategoryId = res.data.categories[0].id;
        const relatedRes = await categories.getPosts(primaryCategoryId);
        const filteredRelated = relatedRes.data
          .filter((p) => String(p.id) !== id)
          .slice(0, 3);
        setRelatedPosts(filteredRelated);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPostData();
    fetchComments();
    fetchLikes();
  }, [id, fetchPostData, fetchComments, fetchLikes]);

  // === COMMENT HANDLERS ===
  const handleCommentAdded = (newComment) => {
    const commentWithRepliesInit = { ...newComment, replies: [] };
    setCommentsList((prev) => [commentWithRepliesInit, ...prev]);
  };

  const handleReplyAdded = (newReply) => {
    setCommentsList((prevList) =>
      prevList.map((comment) => {
        if (comment.id === newReply.parentId) {
          const updatedReplies = comment.replies
            ? [...comment.replies, newReply]
            : [newReply];
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      })
    );
  };

  const handleEditComment = useCallback(async (commentId, newContent) => {
    try {
      const res = await comments.update(commentId, { content: newContent });
      const updatedCommentData = res.data.comment;

      toast.success("Komentar berhasil diperbarui!");

      setCommentsList((prevList) => {
        const updateRecursively = (arr) =>
          arr.map((c) => {
            if (c.id === commentId) return { ...c, content: updatedCommentData.content };
            if (c.replies) return { ...c, replies: updateRecursively(c.replies) };
            return c;
          });
        return updateRecursively(prevList);
      });
    } catch (error) {
      console.error("Gagal mengedit komentar:", error);
      toast.error(error.response?.data?.message || "Gagal memperbarui komentar.");
    }
  }, []);

  const handleOpenDeleteCommentModal = useCallback((commentId) => {
    setCommentToDeleteId(commentId);
    setShowCommentModal(true);
  }, []);

  const confirmDeleteComment = useCallback(async () => {
    if (!commentToDeleteId) return;
    try {
      await comments.remove(commentToDeleteId);
      toast.success("Komentar berhasil dihapus.");
      setCommentsList((prevList) => {
        const filterRecursively = (arr) =>
          arr.filter((c) => {
            if (c.id === commentToDeleteId) return false;
            if (c.replies) c.replies = filterRecursively(c.replies);
            return true;
          });
        return filterRecursively(prevList);
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menghapus komentar.");
    } finally {
      setShowCommentModal(false);
      setCommentToDeleteId(null);
    }
  }, [commentToDeleteId]);

  // === DELETE POST ===
  const handleDeletePost = async () => {
    try {
      await posts.remove(id);
      toast.success("Blog berhasil dihapus!");
      nav("/blog/");
    } catch {
      toast.error("Blog gagal dihapus!");
    } finally {
      setShowPostModal(false);
    }
  };

  // === TOGGLE LIKE ===
  const handleToggleLike = async () => {
    if (!user) return toast.error("Login untuk menyukai postingan ini!");

    try {
      const res = await likes.toggle(id);
      if (res.data.liked) {
        setLikeCount((prev) => prev + 1);
        setUserLiked(true);
      } else {
        setLikeCount((prev) => Math.max(prev - 1, 0));
        setUserLiked(false);
      }
    } catch (error) {
      console.error("Gagal toggle like:", error);
    }
  };

  // === UI ===
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Memuat postingan...
      </div>
    );
  if (!post)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400 text-lg italic">
        Postingan tidak ditemukan
      </div>
    );

  const isAuthor = user && user.id === Number(post.author?.id || post.author);
  const isAuthenticated = !!user;
  const postAuthorId = post.author?.id || post.author;
  const totalCommentsCount = commentsList.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  );

  return (
    <div className="container mx-auto px-4 py-5 md:py-5">
      <ReadingProgress />
      <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10">
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

        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-tight">
          {post.title}
        </h1>

        <p className="text-md text-gray-600 mb-6 border-b pb-4 border-gray-100">
          oleh{" "}
          <span className="font-medium">
            {post.author?.name || "Penulis Tak Dikenal"}
          </span>{" "}
          —{" "}
          <span className="font-light">
            {new Date(post.createdAt).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>

        {post.categories?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 mb-6">
            {post.categories.map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1 text-sm font-semibold rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/30"
              >
                {cat.name.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        {post.image && (
          <div className="flex justify-center my-8">
            <img
              src={post.image}
              alt={post.title}
              className="max-w-4xl w-full aspect-video rounded-xl shadow-xl object-cover"
            />
          </div>
        )}

        <div
          className="mt-10 prose prose-lg quill-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* LIKE */}
        <div className="mt-8 flex items-center gap-3">
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
        </div>

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-5 tracking-tight text-center">
              Postingan Terkait Lainnya
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* KOMENTAR */}
        <div className="mt-16 pt-8 max-w-3xl mx-auto border-t border-gray-200">
          <h2 className="text-3xl font-bold text-brand-navy mb-8 tracking-tight">
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

      {/* MODAL HAPUS POST */}
      {showPostModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-3">Yakin mau hapus blog ini?</h2>
            <p className="text-gray-500 mb-5 text-sm">
              Aksi ini tidak bisa dibatalkan setelah dilakukan.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowPostModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 rounded-lg bg-brand-pink text-white hover:bg-brand-pink/90 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HAPUS KOMENTAR */}
      {showCommentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-3">Hapus Komentar?</h2>
            <p className="text-gray-500 mb-5 text-sm">
              Anda yakin ingin menghapus komentar ini? Aksi ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowCommentModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteComment}
                className="px-4 py-2 rounded-lg bg-brand-pink text-white hover:bg-brand-pink/90 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;