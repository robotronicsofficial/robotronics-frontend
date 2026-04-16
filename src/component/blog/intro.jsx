import { Link } from "react-router-dom";

const resolveImageUrl = (image) => {
  if (!image) return undefined;
  if (image.startsWith("http")) return image;
  return `${import.meta.env.VITE_BACKEND_URL}/${image.replace(/\\/g, "/")}`;
};

const Intro = ({ blog }) => {
  const backgroundImage = resolveImageUrl(blog?.bannerImage || blog?.thumbnailImage);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : undefined}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative lg:p-10 lg:pt-32 pt-24 lg:pl-28 pl-10 pr-10 space-y-4 text-white">
        <p className="text-sm uppercase tracking-[0.35em]" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          {blog?.categories?.[0] || "Blog"}
        </p>
        <p className="lg:text-6xl text-4xl poppins-extrabold mt-10" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          {blog?.title || "Blog Post"}
        </p>
        <p className="max-w-3xl text-base lg:text-lg poppins-light" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          {(blog?.paragraphs?.[0] || "Read the latest update from Robotronics.").slice(0, 180)}
          {(blog?.paragraphs?.[0] || "").length > 180 ? "..." : ""}
        </p>
        <div className="flex flex-wrap gap-4 text-sm poppins-light" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          <span>{blog?.authorName || "Robotronics"}</span>
          <span>{blog?.date ? new Date(blog.date).toLocaleDateString() : "Unknown date"}</span>
          <span>{Number(blog?.views || 0).toLocaleString()} views</span>
        </div>
        <Link to="/Blog">
          <button
            className="text-brown lg:text-2xl poppins-light text-sm bg-white p-5 rounded-xl"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="4000"
          >
            Back to Blog
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
