import PropTypes from "prop-types";
import { FaShareAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

import { fetchBackendJson, getContentLoadErrorMessage } from "../../lib/api";
const BlogCard = ({ cardData }) => {
  // Map backend data structure to match your cardData props
  const mappedData = {
    image: cardData.thumbnailImage || cardData.bannerImage || "https://via.placeholder.com/300",
    tags: cardData.tags || [],
    title: cardData.title || "No title",
    description: cardData.paragraphs?.[0]?.substring(0, 100) + '...' || "No description available",
    author: {
      avatar: cardData.authorImage || "https://via.placeholder.com/150",
      name: cardData.authorName || "Unknown author"
    },
    date: cardData.date ? new Date(cardData.date).toLocaleDateString() : "Unknown date",
    shares: cardData.shares || 0
  };

  return (
    <div className="lg:max-w-[25vw] max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <Link to={`/BlogDetail/${cardData._id}`}>
          <img
            className="w-full h-48 object-cover"
            src={mappedData.image}
            alt={mappedData.title}
            loading="lazy"
            decoding="async"
          />
        </Link>
        <div className="absolute top-0 left-0 mt-4 ml-4 space-x-2">
          {mappedData.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-800 text-white text-sm poppins-light px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button className="bg-white p-2 rounded-full shadow-md">
            <FaShareAlt />
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-wrap poppins-bold text-xl mb-2">
          {mappedData.title}
        </div>
        <p className="text-gray-700 text-wrap poppins-light text-base">
          {mappedData.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex flex-col justify-between">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-row items-center ">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={mappedData.author.avatar}
              alt={mappedData.author.name}
            />
            <p className="text-gray-900 leading-none poppins-light ">
              {mappedData.author.name}
            </p>
          </div>
          <div className="text-sm flex flex-row">
            <Link to={`/BlogDetail/${cardData._id}`} className="text-xl poppins-light">VIEW POST</Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-row space-x-3">
            <p className="text-gray-600 hidden lg:block sm:block">-----</p>
            <p className="text-gray-600 poppins-light">{mappedData.date}</p>
            <span className="text-gray-600">•</span>
          </div>
          <div className="flex flex-row items-center">
            <FaShareAlt />
            <span className="text-gray-600 poppins-light px-1">
              {mappedData.shares} shares
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  cardData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    thumbnailImage: PropTypes.string,
    bannerImage: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
    authorImage: PropTypes.string,
    authorName: PropTypes.string,
    date: PropTypes.string,
    shares: PropTypes.number
  }).isRequired,
};

const BlogPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchBackendJson("/getAllBlogs");
        const blogs = Array.isArray(result) ? result : [];
        setData(blogs);
        setTotalPages(Math.ceil(blogs.length / itemsPerPage));
      } catch (err) {
        setError(getContentLoadErrorMessage(err, "We couldn't load blog posts right now."));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get paginated data
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">No blog posts available</div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="px-12 py-12 flex flex-wrap justify-evenly gap-y-6 bg-background">
        {paginatedData.map((blog) => (
          <BlogCard key={blog._id} cardData={blog} />
        ))}
      </div>
      <div className="p-10 w-full bg-gray-100">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BlogPost;
