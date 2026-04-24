import { Link } from "react-router-dom";
import { FiBarChart2, FiShare2 } from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaQuoteLeft,
  FaQuoteRight,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const BlogDetailBody = ({ blog, previousBlog, nextBlog }) => {
  const paragraphs = Array.isArray(blog?.paragraphs) ? blog.paragraphs.filter(Boolean) : [];
  const categories = Array.isArray(blog?.categories) ? blog.categories : [];
  const tags = Array.isArray(blog?.tags) ? blog.tags : [];
  const leadQuote = paragraphs[0] || blog?.title || "Robotronics";

  return (
    <div className="bg-background md:p-20 p-10">
      <div className="lg:flex" data-aos="fade-up">
        <div className="flex gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <FiBarChart2 size={20} className="text-smallText self-center" />
              <div>
                <p className="text-sm poppins-extralight text-center">views</p>
                <p className="text-sm poppins-extralight text-center">{Number(blog?.views || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <FiShare2 size={20} className="text-smallText self-center" />
              <div>
                <p className="text-sm poppins-extralight text-center">shares</p>
                <p className="text-sm poppins-extralight text-center">{Number(blog?.shares || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <FaFacebook size={20} className="poppins-extralight self-center" />
            </div>
            <div className="flex flex-col gap-2">
              <FaTwitter size={20} className="poppins-extralight self-center" />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5 md:p-5 md:px-10">
            <div className="flex items-center gap-4">
              <img
                className="size-14 rounded-full object-cover"
                src={resolveBackendAssetUrl(blog?.authorImage, "https://via.placeholder.com/160")}
                alt={blog?.authorName || "Author"}
              />
              <div>
                <p className="text-brown poppins-semibold text-lg">{blog?.authorName || "Robotronics"}</p>
                <p className="text-sm poppins-light">{blog?.date ? new Date(blog.date).toLocaleDateString() : "Unknown date"}</p>
              </div>
            </div>

            {paragraphs.map((paragraph, index) => (
              <p key={`${blog?._id}-${index}`} className="text-wrap text-sm text-justify poppins-light leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-brown text-5xl py-3 leading-8 poppins-semibold">Categories</h1>
          <ul>
            {(categories.length > 0 ? categories : tags).map((category, index) => (
              <li key={`${category}-${index}`} className="text-2xl p-2 underline poppins-light leading-8">
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-8" data-aos="fade-up">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="lg:w-2/3">
            <FaQuoteLeft size={24} className="text-quote" />
            <p className="text-balance text-brown poppins-regular lg:text-6xl text-2xl">
              {leadQuote}
            </p>
            <FaQuoteRight size={24} className="text-quote" />
          </div>

          <div>
            <p className="text-3xl regular">Follow Us</p>
            <div className="flex gap-5">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook size={28} className="text-smallText" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter size={28} className="text-smallText" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram size={28} className="text-smallText" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin size={28} className="text-smallText" />
              </a>
            </div>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <span key={`${tag}-${index}`} className="bg-white border border-lin px-4 py-2 rounded-full text-sm poppins-light">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-10">
          <p className="text-center self-center poppins-light">{Number(blog?.shares || 0).toLocaleString()} Shares</p>
          <div className="flex gap-3">
            <FaFacebook className="text-cente self-center" style={{ color: "#1877F2", fontSize: "24px" }} />
            <p className="text-center self-center text-blue-500 poppins-light">Share</p>
          </div>
          <div className="flex gap-3">
            <FaTwitter className="text-center text-blue-500 self-center" />
            <p className="text-center self-center poppins-light">X</p>
          </div>
        </div>

        <div className="flex w-5/6 justify-center gap-2">
          {previousBlog ? (
            <Link to={`/BlogDetail/${previousBlog._id}`}>
              <button className="bg-brown text-white poppins-light hover:bg-gold py-2 px-8 rounded-md">
                Previous
              </button>
            </Link>
          ) : (
            <button className="bg-gray-300 text-white poppins-light py-2 px-8 rounded-md cursor-not-allowed" disabled>
              Previous
            </button>
          )}
          {nextBlog ? (
            <Link to={`/BlogDetail/${nextBlog._id}`}>
              <button className="bg-brown text-white hover:bg-gold poppins-light py-2 px-12 rounded-md">
                Next
              </button>
            </Link>
          ) : (
            <button className="bg-gray-300 text-white poppins-light py-2 px-12 rounded-md cursor-not-allowed" disabled>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailBody;
