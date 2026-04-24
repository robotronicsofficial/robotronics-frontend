import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Intro from "../../component/blog/intro";
import BlogDetailBody from "../../component/blog/blogDetailBody";
import PageState from "../../components/layout/PageState";

import { fetchBackendJson, getContentLoadErrorMessage } from "../../lib/api";
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
        const [blogData, allBlogs] = await Promise.all([
          fetchBackendJson(`/getBlogById/${id}`),
          fetchBackendJson("/getAllBlogs"),
        ]);

        const orderedBlogs = Array.isArray(allBlogs) ? allBlogs : [];
        const currentIndex = orderedBlogs.findIndex((entry) => entry._id === blogData._id);

        setBlog(blogData);
        setPreviousBlog(currentIndex < orderedBlogs.length - 1 ? orderedBlogs[currentIndex + 1] : null);
        setNextBlog(currentIndex > 0 ? orderedBlogs[currentIndex - 1] : null);
        setError("");
      } catch (fetchError) {
        setError(getContentLoadErrorMessage(fetchError, "We couldn't load this blog post right now."));
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <PageState message="Loading blog post..." />;
  }

  if (error || !blog) {
    return <PageState className="text-red-500" message={error || "Blog not found"} />;
  }

  return (
    <div>
      <Intro blog={blog} />
      <BlogDetailBody blog={blog} previousBlog={previousBlog} nextBlog={nextBlog} />
    </div>
  );
};

export default BlogDetail;
