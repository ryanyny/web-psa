import { useEffect, useState } from "react";
import { posts } from "../../http/index.js";
import PostCard from "../../components/blog/PostCard.jsx";

const Home = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await posts.getAll();
        setList(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg font-medium">
        Memuat postingan...
      </div>
    );

  if (!list.length)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400 text-lg italic">
        Belum ada postingan! — jadi yang pertama nulis dong!
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;