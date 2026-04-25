import PropTypes from "prop-types";
import { Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import Pagination from "./Pagination";
import CenteredState from "@/components/layout/CenteredState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useBlogs } from "@/hooks/useBlogs";
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
    <Card className="w-full max-w-sm overflow-hidden rounded p-0 lg:max-w-sm">
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
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {mappedData.tags.map((tag, index) => (
            <Badge
              key={index}
              className="rounded bg-muted px-2 py-1 text-sm font-normal text-background"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="absolute right-4 top-4">
          <Button type="button" variant="ghost" size="icon" className="rounded-full border border-border">
            <Share2 />
          </Button>
        </div>
      </div>
      <CardContent className="px-6 py-4">
        <div className="font-bold text-wrap poppins-bold text-xl mb-2">
          {mappedData.title}
        </div>
        <p className="text-muted-foreground text-wrap poppins-light text-base">
          {mappedData.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col justify-between px-6 pb-2 pt-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              className="size-10 rounded-full"
              src={mappedData.author.avatar}
              alt={mappedData.author.name}
            />
            <p className="text-muted-foreground leading-none poppins-light ">
              {mappedData.author.name}
            </p>
          </div>
          <div className="text-sm flex">
            <Link to={`/BlogDetail/${cardData._id}`} className="text-xl poppins-light">VIEW POST</Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex gap-3">
            <p className="text-muted-foreground hidden lg:block sm:block">-----</p>
            <p className="text-muted-foreground poppins-light">{mappedData.date}</p>
            <span className="text-muted-foreground">•</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 />
            <span className="text-muted-foreground poppins-light">
              {mappedData.shares} shares
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
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
  const {
    data = [],
    isLoading: loading,
    error,
  } = useBlogs();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get paginated data
  const paginatedData = useMemo(
    () => data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    ),
    [currentPage, data],
  );

  if (loading) {
    return (
      <CenteredState className="h-screen">
        <div className="text-xl">Loading blogs...</div>
      </CenteredState>
    );
  }

  if (error) {
    return (
      <CenteredState className="h-screen">
        <div className="text-xl text-destructive">
          {error.message || "We couldn't load blog posts right now."}
        </div>
      </CenteredState>
    );
  }

  if (data.length === 0) {
    return (
      <CenteredState className="h-screen">
        <div className="text-xl">No blog posts available</div>
      </CenteredState>
    );
  }

  return (
    <div className="bg-background">
      <div className="px-12 py-12 flex flex-wrap justify-evenly gap-y-6 bg-background">
        {paginatedData.map((blog) => (
          <BlogCard key={blog._id} cardData={blog} />
        ))}
      </div>
      <div className="p-10 w-full bg-muted">
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
