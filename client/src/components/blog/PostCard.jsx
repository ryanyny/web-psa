import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <article className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Tampilkan gambar jika ada */}
      {post.image && (
        <Link to={`/blog/post/${post.id}`} className="block overflow-hidden rounded-xl mb-4">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover rounded-xl transform hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}

      {/* Judul blog */}
      <Link to={`/blog/post/${post.id}`}>
        <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h2>
      </Link>

      {/* Info author dan tanggal post dibuat */}
      <p className="text-sm text-gray-500 mt-1">
        oleh <span className="font-medium">{post.author?.name || "Unknown"}</span> —{" "}
        {new Date(post.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Kutipan singkat isi artikel */}
      <p className="mt-3 text-gray-700 line-clamp-3">{post.excerpt}...</p>

      {/* Link menuju detail blog */}
      <Link
        to={`/blog/post/${post.id}`}
        className="mt-4 inline-block text-blue-600 font-medium hover:underline"
      >
        Selengkapnya
      </Link>
    </article>
  );
};

export default PostCard;