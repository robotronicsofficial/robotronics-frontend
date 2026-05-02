import { Link } from "@tanstack/react-router";
import { BarChart2, Quote, Share2 } from "lucide-react";

import { BrandIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";

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
            <div className="flex flex-col items-start gap-1">
              <BarChart2 size={20} className="text-muted-foreground" />
              <span className="text-sm">views</span>
              <span className="text-sm">{Number(blog?.views || 0).toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <Share2 size={20} className="text-muted-foreground" />
              <span className="text-sm">shares</span>
              <span className="text-sm">{Number(blog?.shares || 0).toLocaleString()}</span>
            </div>
            <BrandIcon brand="facebook" size={20} className="" />
            <BrandIcon brand="twitter" size={20} className="" />
          </div>

          <div className="flex flex-col justify-center gap-5 md:p-5 md:px-10">
            <div className="flex items-center gap-4">
              <img
                className="size-14 rounded-full object-cover"
                src={resolveBackendAssetUrl(blog?.authorImage, "https://via.placeholder.com/160")}
                alt={blog?.authorName || "Author"}
              />
              <div>
                <p className="text-foreground text-lg">{blog?.authorName || "Robotronics"}</p>
                <p className="text-sm">{blog?.date ? new Date(blog.date).toLocaleDateString() : "Unknown date"}</p>
              </div>
            </div>

            {paragraphs.map((paragraph, index) => (
              <p key={`${blog?._id}-${index}`} className="text-wrap text-sm text-justify leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-foreground text-5xl py-3 leading-8">Categories</h1>
          <ul>
            {(categories.length > 0 ? categories : tags).map((category, index) => (
              <li key={`${category}-${index}`} className="text-2xl p-2 underline leading-8">
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-8" data-aos="fade-up">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="lg:w-2/3">
            <Quote size={24} className="text-muted-foreground" />
            <p className="text-balance text-foreground lg:text-6xl text-2xl">
              {leadQuote}
            </p>
            <Quote size={24} className="text-muted-foreground" />
          </div>

          <div>
            <p className="text-3xl regular">Follow Us</p>
            <div className="flex gap-5">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <BrandIcon brand="facebook" size={28} className="text-muted-foreground" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <BrandIcon brand="twitter" size={28} className="text-muted-foreground" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <BrandIcon brand="instagram" size={28} className="text-muted-foreground" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <BrandIcon brand="linkedin" size={28} className="text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <Badge key={`${tag}-${index}`} variant="outline" className="rounded-full bg-card px-4 py-2 text-sm font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-10">
          <p className="text-center self-center">{Number(blog?.shares || 0).toLocaleString()} Shares</p>
          <div className="flex gap-3">
            <BrandIcon brand="facebook" className="self-center text-primary text-2xl" />
            <p className="text-center self-center text-info">Share</p>
          </div>
          <div className="flex gap-3">
            <BrandIcon brand="twitter" className="text-center text-info self-center" />
            <p className="text-center self-center">X</p>
          </div>
        </div>

        <div className="flex w-5/6 justify-center gap-2">
          {previousBlog ? (
            <Button asChild className="h-auto bg-foreground px-8 py-2 text-background hover:bg-primary">
              <Link to={`/BlogDetail/${previousBlog._id}`}>
                Previous
              </Link>
            </Button>
          ) : (
            <Button className="h-auto cursor-not-allowed bg-muted px-8 py-2 text-background" disabled>
              Previous
            </Button>
          )}
          {nextBlog ? (
            <Button asChild className="h-auto bg-foreground px-12 py-2 text-background hover:bg-primary">
              <Link to={`/BlogDetail/${nextBlog._id}`}>
                Next
              </Link>
            </Button>
          ) : (
            <Button className="h-auto cursor-not-allowed bg-muted px-12 py-2 text-background" disabled>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailBody;
