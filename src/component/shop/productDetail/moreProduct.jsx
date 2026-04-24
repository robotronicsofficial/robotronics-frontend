import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  COMMERCE_ITEM_TYPES,
  createCourseCommerceItem,
  createProductCommerceItem,
  getCommerceItemKey,
  getCommerceItemRoute,
} from "../../../lib/commerceItems";
import { COURSE_PATH } from "../../../router/paths";
import { resolveBackendAssetUrl } from "../../../utils/mediaUrl";

import { cn } from "../../../lib/utils";
import { useCourses } from "../../../hooks/useCourses";
import { useProducts } from "../../../hooks/useProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const RELATED_ITEM_CONFIG = {
  [COMMERCE_ITEM_TYPES.product]: {
    browsePath: "/shop",
    browseLabel: "Browse the store",
    emptyLabel: "No other products are available right now.",
    subtitle: "Top Selling Products",
    loadingLabel: "Loading related products...",
    errorLabel: "Failed to load related products",
    createItem: createProductCommerceItem,
  },
  [COMMERCE_ITEM_TYPES.course]: {
    browsePath: COURSE_PATH,
    browseLabel: "Browse courses",
    emptyLabel: "No other courses are available right now.",
    subtitle: "Top Selling Courses",
    loadingLabel: "Loading related courses...",
    errorLabel: "Failed to load related courses",
    createItem: createCourseCommerceItem,
  },
};

const RelatedItemsMessage = ({ children, tone = "default" }) => (
  <div
    className={cn(
      "rounded-2xl bg-card p-10 text-center shadow-sm",
      tone === "error" ? "text-destructive" : "text-foreground",
    )}
  >
    {children}
  </div>
);

const MoreProduct = ({ itemType = COMMERCE_ITEM_TYPES.product }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const config = RELATED_ITEM_CONFIG[itemType] || RELATED_ITEM_CONFIG.product;
  const productQuery = useProducts();
  const courseQuery = useCourses();
  const query = itemType === COMMERCE_ITEM_TYPES.course ? courseQuery : productQuery;
  const loading = query.isLoading;
  const error = query.error;
  const items = useMemo(
    () => (query.data || [])
      .map((entry) => config.createItem(entry))
      .filter(Boolean)
      .filter((entry) => entry.itemId !== id),
    [config, id, query.data],
  );

  const topThree = useMemo(() => items.slice(0, 3), [items]);

  return (
    <div className="bg-background p-14">
      <div className="flex flex-col gap-8">
        <p
          className="lg:text-5xl text-2xl poppins-bold text-foreground text-center"
          data-aos="fade-up"
        >
          You May Also Like This
        </p>

        <p
          className="text-muted-foreground text-wrap poppins-light text-center"
          data-aos="fade-up"
        >
          {config.subtitle}
        </p>

        {loading ? (
          <RelatedItemsMessage>{config.loadingLabel}</RelatedItemsMessage>
        ) : error ? (
          <RelatedItemsMessage tone="error">{config.errorLabel}</RelatedItemsMessage>
        ) : topThree.length === 0 ? (
          <RelatedItemsMessage>
            {config.emptyLabel}
            <div className="mt-4">
              <Button
                type="button"
                onClick={() => navigate(config.browsePath)}
                className="h-auto rounded-lg bg-foreground px-5 py-3 font-semibold text-primary"
              >
                {config.browseLabel}
              </Button>
            </div>
          </RelatedItemsMessage>
        ) : (
          <div
            className="grid gap-6 lg:grid-cols-3"
            data-aos="fade-up"
          >
            {topThree.map((item, index) => (
              <Card
                key={getCommerceItemKey(item) || index}
                onClick={() => navigate(getCommerceItemRoute(item))}
                className="overflow-hidden rounded-2xl bg-card text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(getCommerceItemRoute(item));
                  }
                }}
              >
                <img
                  src={resolveBackendAssetUrl(item?.images?.[0], "https://via.placeholder.com/300x200")}
                  alt={item?.name || "Item"}
                  className="h-64 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <CardContent className="flex flex-col gap-3 p-5 text-foreground">
                  <div className="flex items-start justify-between gap-3">
                    <Badge variant="secondary" className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {item?.category || "General"}
                    </Badge>
                    <p className="text-sm font-semibold">PKR {Number(item?.price || 0).toLocaleString()}</p>
                  </div>
                  <h3 className="text-lg font-bold leading-snug">{item?.name || "Item"}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {item?.description || "Live catalog listing from Robotronics."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreProduct;
