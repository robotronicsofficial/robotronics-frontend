import { useParams } from "react-router-dom";
import Intro from "../../component/blog/intro";
import BlogDetailBody from "../../component/blog/blogDetailBody";
import PageState from "../../components/layout/PageState";

import { useBlog, useBlogs } from "../../hooks/useBlogs";
const BlogDetail = () => {
  const { id } = useParams();
  const {
    data: blog,
    isLoading: blogLoading,
    error,
  } = useBlog(id);
  const { data: orderedBlogs = [], isLoading: blogsLoading } = useBlogs();
  const currentIndex = orderedBlogs.findIndex((entry) => entry._id === blog?._id);
  const previousBlog = currentIndex < orderedBlogs.length - 1 ? orderedBlogs[currentIndex + 1] : null;
  const nextBlog = currentIndex > 0 ? orderedBlogs[currentIndex - 1] : null;
  const loading = blogLoading || blogsLoading;

  if (loading) {
    return <PageState message="Loading blog post..." />;
  }

  if (!id || error || !blog) {
    return <PageState className="text-red-500" message={error?.message || "Blog not found"} />;
  }

  return (
    <div>
      <Intro blog={blog} />
      <BlogDetailBody blog={blog} previousBlog={previousBlog} nextBlog={nextBlog} />
    </div>
  );
};

export default BlogDetail;
