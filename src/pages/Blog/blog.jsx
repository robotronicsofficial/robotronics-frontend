import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Heading,
  Highlight,
  Text,
} from "@/components/ui/typography";
import { useBlogs } from "@/hooks/useBlogs";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 6;

const PostCard = ({ post }) => {
  const image = post.thumbnailImage || post.bannerImage;
  const description = post.paragraphs?.[0]?.slice(0, 140);
  return (
    <article className="group/post flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md">
      <Link
        to="/BlogDetail/$id"
        params={{ id: post._id }}
        className="block aspect-[16/10] overflow-hidden bg-muted"
      >
        {image ? (
          <img
            src={image}
            alt={post.title || "Blog post"}
            className="size-full object-cover transition-transform duration-300 group-hover/post:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="size-full bg-gradient-to-br from-primary-soft to-muted" />
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <Heading level={3} className="text-h5 leading-snug">
          <Link
            to="/BlogDetail/$id"
            params={{ id: post._id }}
            className="hover:text-primary"
          >
            {post.title || "Untitled post"}
          </Link>
        </Heading>
        {description && (
          <Text size="sm" tone="muted">
            {description}
            {post.paragraphs?.[0]?.length > 140 ? "…" : ""}
          </Text>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <Text size="xs" tone="subtle">
            {post.authorName || "Robotronics"}
          </Text>
          {post.date && (
            <Text size="xs" tone="subtle">
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          )}
        </div>
      </div>
    </article>
  );
};

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Previous page"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="rounded-full"
      >
        <ChevronLeft className="size-4" />
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Button
          key={n}
          type="button"
          variant={n === page ? "default" : "ghost"}
          size="icon"
          aria-label={`Page ${n}`}
          aria-current={n === page ? "page" : undefined}
          onClick={() => onChange(n)}
          className={cn("rounded-full", n === page && "font-semibold")}
        >
          {n}
        </Button>
      ))}
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Next page"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="rounded-full"
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
};

const Blog = () => {
  const { data: posts = [], isLoading, error } = useBlogs();
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const paginated = useMemo(
    () => posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE),
    [posts, page],
  );

  return (
    <>
      <section className="bg-background pt-header pb-12">
        <Container size="wide">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <Eyebrow>Blog</Eyebrow>
            <Display size="lg">
              Stories from <Highlight>future-ready kids</Highlight>.
            </Display>
            <Text size="lg" tone="muted" className="max-w-2xl">
              Articles, tutorials, and project showcases from the Robotronics.ai community — written for parents, educators, and curious learners.
            </Text>
          </div>
        </Container>
      </section>

      <section className="bg-background pb-24">
        <Container size="wide">
          {isLoading ? (
            <Text tone="muted" className="text-center">
              Loading posts…
            </Text>
          ) : error ? (
            <Text className="text-center text-destructive">
              {error.message || "We couldn't load blog posts right now."}
            </Text>
          ) : posts.length === 0 ? (
            <Text tone="muted" className="text-center">
              No posts yet — check back soon.
            </Text>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginated.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default Blog;
