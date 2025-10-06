import { Link } from "react-router-dom"

const PostCard = ({ post }) => {
  return (
    <article className="bg-white p-4 rounded shadow-sm">
      {/* Tampilkan gambar jika ada */}
      {post.image && (
        <Link to={`/blog/post/${post.id}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover rounded mb-3"
          />
        </Link>
      )}

      {/* Judul blog */}
      <Link to={`/blog/post/${post.id}`}>
        <h2 className="text-xl font-semibold">{post.title}</h2>
      </Link>
      {/* Info author dan tanggal post dibuat */}
      <p className="text-sm text-gray-500">
        oleh {post.author?.name || "Unknown"} —{" "}
        {new Date(post.createdAt).toLocaleString()}
      </p>
      {/* Kutipan singkat isi artikel */}
      <p className="mt-2">{post.excerpt}...</p>
      {/* Link menuju detail blog  */}
      <Link
        to={`/blog/post/${post.id}`}
        className="text-blue-600 mt-2 inline-block"
      >
        Selengkapnya
      </Link>
    </article>
  )
}

export default PostCard