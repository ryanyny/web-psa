import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden flex flex-col justify-between 
                        group shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
      {post.image && (
        <Link to={`/blog/post/${post.id}`} className="block overflow-hidden">
          <div className="w-full aspect-video overflow-hidden bg-gray-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/blog/post/${post.id}`}>
          <h2 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {post.categories?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1 text-xs font-semibold rounded-full 
                          bg-brand-blue/10 text-brand-blue border border-brand-blue/30"
              >
                {cat.name.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-500 mt-3 mb-4">
          oleh <span className="font-semibold">{post.author?.name || "Penulis Tak Dikenal"}</span> —{" "}
          {new Date(post.createdAt).toLocaleDateString("id-ID", { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>

        <p className="mt-2 text-gray-600 line-clamp-3 flex-grow">{post.excerpt}</p>

        <Link
          to={`/blog/post/${post.id}`}
          className="mt-4 inline-flex items-center text-brand-blue font-semibold hover:text-brand-blue/80 transition duration-200"
        >
          Baca selengkapnya →
        </Link>
      </div>
    </article>
  );
};

export default PostCard;