import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Intro from "../../component/blog/intro";
import BlogDetailBody from "../../component/blog/blogDetailBody";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [previousBlog, setPreviousBlog] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setError("Blog post not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [blogResponse, allBlogsResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/getBlogById/${id}`),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/getAllBlogs`),
        ]);

        if (!blogResponse.ok) {
          throw new Error("Failed to fetch blog post");
        }

        if (!allBlogsResponse.ok) {
          throw new Error("Failed to load blog navigation");
        }

        const [blogData, allBlogs] = await Promise.all([
          blogResponse.json(),
          allBlogsResponse.json(),
        ]);

        const orderedBlogs = Array.isArray(allBlogs) ? allBlogs : [];
        const currentIndex = orderedBlogs.findIndex((entry) => entry._id === blogData._id);

        setBlog(blogData);
        setPreviousBlog(currentIndex < orderedBlogs.length - 1 ? orderedBlogs[currentIndex + 1] : null);
        setNextBlog(currentIndex > 0 ? orderedBlogs[currentIndex - 1] : null);
        setError("");
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="bg-background pt-44 pb-20 text-center">Loading blog post...</div>;
  }

  if (error || !blog) {
    return <div className="bg-background pt-44 pb-20 text-center text-red-500">{error || "Blog not found"}</div>;
  }

  return (
    <div>
      <Intro blog={blog} />
      <BlogDetailBody blog={blog} previousBlog={previousBlog} nextBlog={nextBlog} />
    </div>
  );
};

export default BlogDetail;
