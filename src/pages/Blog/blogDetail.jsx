import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Eye, Share2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { BrandIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Text,
} from "@/components/ui/typography";
import PageState from "@/components/layout/PageState";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useBlog, useBlogs } from "../../hooks/useBlogs";

const formatDate = (value) => {
  if (!value) return null;
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const SOCIAL_SHARE = [
  { brand: "facebook", href: "https://www.facebook.com", label: "Share on Facebook" },
  { brand: "twitter", href: "https://twitter.com", label: "Share on X" },
  { brand: "linkedin", href: "https://www.linkedin.com", label: "Share on LinkedIn" },
];

const BlogDetail = () => {
  const { id } = useParams({ strict: false });
  const { data: blog, isLoading, error } = useBlog(id);
  const { data: orderedBlogs = [] } = useBlogs();

  if (isLoading) return <PageState message="Loading blog post…" />;
  if (!id || error || !blog) {
    return <PageState className="text-destructive" message={error?.message || "Blog post not found."} />;
  }

  const banner = resolveBackendAssetUrl(blog.bannerImage || blog.thumbnailImage);
  const paragraphs = (blog.paragraphs || []).filter(Boolean);
  const tags = blog.tags || [];
  const category = blog.categories?.[0];

  const currentIndex = orderedBlogs.findIndex((entry) => entry._id === blog._id);
  const previousBlog = currentIndex >= 0 && currentIndex < orderedBlogs.length - 1
    ? orderedBlogs[currentIndex + 1]
    : null;
  const nextBlog = currentIndex > 0 ? orderedBlogs[currentIndex - 1] : null;

  return (
    <article className="bg-background pb-20">
      <header className="bg-muted/40 pt-header pb-16">
        <Container size="narrow" className="px-6">
          <div className="flex flex-col items-start gap-5">
            <Button asChild variant="ghost" size="sm" className="gap-1.5 px-2 -ml-2">
              <Link to="/Blog">
                <ChevronLeft className="size-4" />
                Back to blog
              </Link>
            </Button>
            {category && <Eyebrow>{category}</Eyebrow>}
            <Display size="md">{blog.title || "Untitled"}</Display>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {blog.authorName || "Robotronics"}
              </span>
              {blog.date && <span>{formatDate(blog.date)}</span>}
              <span className="inline-flex items-center gap-1.5">
                <Eye className="size-3.5" />
                {Number(blog.views || 0).toLocaleString()} views
              </span>
            </div>
          </div>
        </Container>
      </header>

      <Container size="narrow" className="px-6">
        {banner && (
          <img
            src={banner}
            alt={blog.title || "Blog banner"}
            className="-mt-8 w-full rounded-2xl border border-border bg-card object-cover shadow-lg"
            loading="eager"
          />
        )}

        <div className="mt-12 flex max-w-prose flex-col gap-5">
          {paragraphs.map((paragraph, i) => (
            <Text key={i} size="lg" className="leading-relaxed text-foreground">
              {paragraph}
            </Text>
          ))}
        </div>

        {tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <div className="flex items-center gap-3">
            <Share2 className="size-4 text-muted-foreground" />
            <Text size="sm" tone="muted">
              {Number(blog.shares || 0).toLocaleString()} shares
            </Text>
          </div>
          <ul className="flex items-center gap-2">
            {SOCIAL_SHARE.map(({ brand, href, label }) => (
              <li key={brand}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <BrandIcon brand={brand} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {(previousBlog || nextBlog) && (
          <nav
            aria-label="Post navigation"
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            {previousBlog ? (
              <Button asChild variant="outline" className="justify-start gap-2">
                <Link to="/BlogDetail/$id" params={{ id: previousBlog._id }}>
                  <ChevronLeft className="size-4" />
                  Previous post
                </Link>
              </Button>
            ) : (
              <span />
            )}
            {nextBlog ? (
              <Button asChild variant="outline" className="justify-end gap-2">
                <Link to="/BlogDetail/$id" params={{ id: nextBlog._id }}>
                  Next post
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <span />
            )}
          </nav>
        )}
      </Container>
    </article>
  );
};

export default BlogDetail;
