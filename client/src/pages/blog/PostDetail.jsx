import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { posts } from "../../http/index.js";
import AuthContext from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";

const PostDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false)

  // Ambil detail post
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await posts.getById(id);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  // Handle hapus post
  const handleDelete = async () => {
    try {
      await posts.remove(id);
      toast.success("Blog berhasil dihapus!")
      nav("/blog/");
    } catch {
      toast.error("Blog gagal dihapus!");
    } finally {
      setShowModal(false)
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
        {/* Judul Post */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>
        {/* Info author dan tanggal post dibuat */}
        <p className="text-sm text-gray-500 mb-4">
        oleh <span className="font-medium">{post.author?.name || "Unknown"}</span> —{" "}
        {new Date(post.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        </p>

        {/* Tampilkan cover image jika ada */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full max-h-[500px] object-cover rounded-lg my-6 shadow-sm"
          />
        )}

        {/* Konten post (rich text) */}
        <div
          className="mt-6 prose prose-sm md:prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tombol Ubah dan Hapus jika user adalah author */}
        {isAuthor && (
          <div className="mt-6 flex gap-3">
            <Link
              to={`/blog/edit/${post.id}`}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Ubah
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Hapus
            </button>
          </div>
        )}
      </div>

      {/* Modal konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-3">Yakin mau hapus blog ini?</h2>
            <p className="text-gray-500 mb-5 text-sm">
              Aksi ini tidak bisa dibatalkan setelah dilakukan.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
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