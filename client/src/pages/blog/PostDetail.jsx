import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { posts, categories, comments } from "../..//http/index.js";
import AuthContext from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";
import PostCard from "../../components/blog/PostCard.jsx";
import ReadingProgress from "../../components/blog/ReadingProgress.jsx";
import CommentForm from "../../components/blog/CommentForm.jsx"; // Pastikan huruf besar
import CommentList from "../../components/blog/CommentList.jsx"; // Pastikan huruf besar

const PostDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false); 

  // ====== STATE BARU UNTUK KOMENTAR =======
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);
  // =======================================

  // 💡 FUNGSI MEMUAT KOMENTAR (DIBUNGKUS DENGAN useCallback)
  const fetchComments = useCallback(async () => {
    setCommentsLoading(true);
    try {
      // Menggunakan ID postingan untuk mengambil komentar
      const res = await comments.getCommentsByPost(id); 
      setCommentsList(res.data);
    } catch (error) {
      console.error("Gagal memuat komentar:", error);
    } finally {
      setCommentsLoading(false);
    }
  }, [id]);

  // 💡 FUNGSI INI HANYA MEMICU MODAL (TIDAK MENGHAPUS LANGSUNG)
  const handleOpenDeleteCommentModal = useCallback((commentId) => {
    setCommentToDeleteId(commentId);
    setShowCommentModal(true);
  }, []);

  // 💡 FUNGSI MENGHAPUS KOMENTAR (Fungsi ini dipanggil dari modal)
  const confirmDeleteComment = useCallback(async () => {
    if (!commentToDeleteId) return;

    try {
      await comments.remove(commentToDeleteId);
      toast.success("Komentar berhasil dihapus.");
      fetchComments(); // Muat ulang daftar komentar
    } catch (error) {
      console.error("Gagal menghapus komentar:", error);
      toast.error(error.response?.data?.message || "Gagal menghapus komentar.");
    } finally {
      // Tutup modal dan reset ID setelah operasi selesai
      setShowCommentModal(false);
      setCommentToDeleteId(null);
    }
  }, [commentToDeleteId, fetchComments]); 

  // 1. useEffect untuk mengambil Detail Post dan Related Posts
  useEffect(() => {
    const fetch = async () => {
      setLoading(true); // Mulai loading post utama
      try {
        const res = await posts.getById(id);
        setPost(res.data);

        // Ambil postingan terkait
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
        setLoading(false); // Selesai loading post utama
      }
    };
    fetch();
  }, [id]);

  // 2. useEffect terpisah untuk mengambil Komentar
  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id, fetchComments]); 

  // Handle hapus post (Fungsi ini dipanggil dari Modal Post)
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
  const isAuthenticated = !!user; // Cek apakah user login

  return (
    <div className="container mx-auto px-4 py-5 md:py-5">
      <ReadingProgress />
      <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10">
        {/* Tombol Ubah dan Hapus jika user adalah author */}
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
        {/* Judul Post */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-tight">
          {post.title}
        </h1>

        {/* Info author dan tanggal post dibuat */}
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

        {/* Kategori */}
        {post.categories?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 mb-6">
            {post.categories.map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1 text-sm font-semibold rounded-full
                  bg-brand-blue/10 text-brand-blue border border-brand-blue/30"
              >
                {cat.name.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        {/* Tampilkan cover image jika ada */}
        {post.image && (
          <div className="flex justify-center my-8">
            <img
              src={post.image}
              alt={post.title}
              className="max-w-4xl w-full aspect-video rounded-xl shadow-xl object-cover"
            />
          </div>
        )}

        {/* Konten post (rich text) */}
        <div
          className="mt-10 prose prose-lg quill-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Postingan terkait */}
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
                className="px-6 py-3 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition duration-300 border border-blue-200">
                  Lihat Semua Postingan
                </Link>
            </div>
          </div>
        )}
        
        {/* ===================================== */}
        {/* BAGIAN KOMENTAR BARU */}
        {/* ===================================== */}
        <div className="mt-16 pt-8 max-w-3xl mx-auto border-t border-gray-200">
          <h2 className="text-3xl font-bold text-brand-navy mb-8 tracking-tight">
            Komentar ({commentsList.length})
          </h2>

          {/* 1. FORM KOMENTAR */}
          <CommentForm 
            postId={id} 
            onCommentAdded={fetchComments} // Ketika komentar ditambah, refresh daftar
            isAuthenticated={isAuthenticated} 
          />
          
          {/* 2. DAFTAR KOMENTAR */}
          <div className="mt-10">
            {commentsLoading ? (
              <div className="text-center text-gray-500 py-6">Memuat komentar...</div>
            ) : (
              <CommentList 
                  comments={commentsList} 
                  currentUser={user} // Pass user saat ini untuk cek kepemilikan
                  onDelete={handleOpenDeleteCommentModal} 
              />
            )}
          </div>
        </div>
      </div>
        

      {/* ===================================== */}
      {/* MODAL UNTUK HAPUS POST */}
      {/* ===================================== */}
      {showPostModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-3">
              Yakin mau hapus blog ini?
            </h2>
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

      {/* ===================================== */}
      {/* MODAL BARU UNTUK HAPUS KOMENTAR */}
      {/* ===================================== */}
      {showCommentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-3">
              Hapus Komentar?
            </h2>
            <p className="text-gray-500 mb-5 text-sm">
              Anda yakin ingin menghapus komentar ini? Komentar akan hilang secara permanen.
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