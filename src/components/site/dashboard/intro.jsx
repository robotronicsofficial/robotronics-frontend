import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { getHeaderOffsetClass } from "@/components/layout/headerOffset";

const PATH_LABELS = {
  Dashboard: "Dashboard",
  userInfo: "My info",
  MyCoursesPage: "My courses",
  myAllCourses: "All courses",
  WishList: "Wishlist",
  PaymentHistory: "Payment history",
  ChildProfile: "Child profiles",
  MyProducts: "My products",
  courseDetail: "Course",
  ProgressCertificate: "Progress & certificates",
  International: "International",
};

const prettify = (segment) => {
  if (!segment) return "";
  if (PATH_LABELS[segment]) return PATH_LABELS[segment];
  // Fallback: decode + replace separators + capitalize
  const decoded = decodeURIComponent(segment).replace(/[-_]+/g, " ");
  return decoded.charAt(0).toUpperCase() + decoded.slice(1);
};

const Intro = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return { name: prettify(segment), href };
  });

  return (
    <div className={getHeaderOffsetClass("bg-background hidden md:block")}>
      <div>
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex w-full bg-muted rounded-lg px-7 py-2 lg:w-1/2">
            <ol className="flex list-none flex-wrap items-center gap-x-2">
              {breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={breadcrumb.href} className="flex items-center gap-x-2">
                    {isLast ? (
                      <span
                        aria-current="page"
                        className="text-xs lg:text-sm text-foreground"
                      >
                        {breadcrumb.name}
                      </span>
                    ) : (
                      <Link
                        to={breadcrumb.href}
                        className="text-xs lg:text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                      >
                        {breadcrumb.name}
                      </Link>
                    )}
                    {!isLast && (
                      <ChevronRight aria-hidden="true" className="size-3 text-muted-foreground" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Intro;
