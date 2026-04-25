import { useMemo } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import {
  COMMERCE_ITEM_TYPES,
  createCourseCommerceItem,
  createProductCommerceItem,
  getCommerceItemKey,
  getCommerceItemRoute,
} from "@/lib/commerceItems";
import { COURSE_PATH } from "@/router/paths";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";

import { cn } from "@/lib/utils";
import { formatShopCurrency } from "@/lib/shopCheckout";
import { useCourses } from "@/hooks/useCourses";
import { useProducts } from "@/hooks/useProducts";
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
      "rounded-2xl border border-border bg-card p-10 text-center",
      tone === "error" ? "text-destructive" : "text-foreground",
    )}
  >
    {children}
  </div>
);

const MoreProduct = ({ itemType = COMMERCE_ITEM_TYPES.product }) => {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
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
    <div className="bg-background px-6 py-10 lg:px-14 lg:py-14">
      <div className="flex flex-col gap-6">
        <div className="mt-8 flex flex-col gap-1" data-aos="fade-up">
          <p className="text-xl poppins-semibold text-foreground">
            You may also like
          </p>
          <p className="text-sm text-muted-foreground poppins-light">
            {config.subtitle}
          </p>
        </div>

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
                onClick={() => navigate({ to: config.browsePath })}
                className="h-auto rounded-lg bg-foreground px-5 py-3 font-semibold text-primary"
              >
                {config.browseLabel}
              </Button>
            </div>
          </RelatedItemsMessage>
        ) : (
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-aos="fade-up"
          >
            {topThree.map((item, index) => (
              <Card
                key={getCommerceItemKey(item) || index}
                onClick={() => navigate({ to: getCommerceItemRoute(item) })}
                className="overflow-hidden rounded-xl bg-card text-left transition-colors hover:bg-muted/40"
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate({ to: getCommerceItemRoute(item) });
                  }
                }}
              >
                <img
                  src={resolveBackendAssetUrl(item?.images?.[0], "https://via.placeholder.com/300x200")}
                  alt={item?.name || "Item"}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <CardContent className="flex flex-col gap-2 p-4 text-foreground">
                  <h3 className="line-clamp-1 text-sm poppins-semibold leading-snug">
                    {item?.name || "Item"}
                  </h3>
                  <p className="text-sm font-semibold text-accent">
                    {formatShopCurrency(item?.price)}
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
