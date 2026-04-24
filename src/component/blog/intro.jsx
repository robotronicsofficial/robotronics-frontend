import { Link } from "react-router-dom";

import { getHeaderOffsetClass } from "../../components/layout/headerOffset";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const Intro = ({ blog }) => {
  const backgroundImage = resolveBackendAssetUrl(blog?.bannerImage || blog?.thumbnailImage);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : undefined}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className={getHeaderOffsetClass("blogHero", "relative flex flex-col gap-4 pl-10 pr-10 text-white lg:p-10 lg:pl-28")}>
        <p className="text-sm uppercase tracking-[0.35em]" data-aos="fade-up">
          {blog?.categories?.[0] || "Blog"}
        </p>
        <p className="lg:text-6xl text-4xl poppins-extrabold mt-10" data-aos="fade-up">
          {blog?.title || "Blog Post"}
        </p>
        <p className="max-w-3xl text-base lg:text-lg poppins-light" data-aos="fade-up">
          {(blog?.paragraphs?.[0] || "Read the latest update from Robotronics.").slice(0, 180)}
          {(blog?.paragraphs?.[0] || "").length > 180 ? "..." : ""}
        </p>
        <div className="flex flex-wrap gap-4 text-sm poppins-light" data-aos="fade-up">
          <span>{blog?.authorName || "Robotronics"}</span>
          <span>{blog?.date ? new Date(blog.date).toLocaleDateString() : "Unknown date"}</span>
          <span>{Number(blog?.views || 0).toLocaleString()} views</span>
        </div>
        <Link
          to="/Blog"
          className="w-fit rounded-xl bg-white p-5 text-sm text-foreground poppins-light lg:text-2xl"
          data-aos="fade-up"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default Intro;
