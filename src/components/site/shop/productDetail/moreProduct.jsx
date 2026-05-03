import { useMemo } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import {
  COMMERCE_ITEM_TYPES,
  createCourseCommerceItem,
  createProductCommerceItem,
  getCommerceItemKey,
  getCommerceItemRoute,
} from "@/lib/commerceItems";
import { COURSE_PATH } from "@/router/paths";
import { cn } from "@/lib/utils";
import { formatShopCurrency } from "@/lib/shopCheckout";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useCourses } from "@/hooks/useCourses";
import { useProducts } from "@/hooks/useProducts";

const RELATED_ITEM_CONFIG = {
  [COMMERCE_ITEM_TYPES.product]: {
    browsePath: "/shop",
    browseLabel: "Browse the store",
    emptyLabel: "No other products are available right now.",
    subtitle: "Top selling products",
    loadingLabel: "Loading related products…",
    errorLabel: "Failed to load related products",
    createItem: createProductCommerceItem,
  },
  [COMMERCE_ITEM_TYPES.course]: {
    browsePath: COURSE_PATH,
    browseLabel: "Browse courses",
    emptyLabel: "No other courses are available right now.",
    subtitle: "Top selling courses",
    loadingLabel: "Loading related courses…",
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
    () =>
      (query.data || [])
        .map((entry) => config.createItem(entry))
        .filter(Boolean)
        .filter((entry) => entry.itemId !== id),
    [config, id, query.data],
  );
  const topThree = useMemo(() => items.slice(0, 3), [items]);

  return (
    <section className="bg-background py-14">
      <Container size="wide" className="flex flex-col gap-6">
        <div className="flex flex-col gap-1" data-aos="fade-up">
          <Eyebrow>{config.subtitle}</Eyebrow>
          <Heading level={2} className="text-h3">You may also like</Heading>
        </div>

        {loading ? (
          <RelatedItemsMessage>{config.loadingLabel}</RelatedItemsMessage>
        ) : error ? (
          <RelatedItemsMessage tone="error">{config.errorLabel}</RelatedItemsMessage>
        ) : topThree.length === 0 ? (
          <RelatedItemsMessage>
            <div className="flex flex-col items-center gap-4">
              <Text tone="muted">{config.emptyLabel}</Text>
              <Button
                type="button"
                onClick={() => navigate({ to: config.browsePath })}
              >
                {config.browseLabel}
              </Button>
            </div>
          </RelatedItemsMessage>
        ) : (
          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            data-aos="fade-up"
          >
            {topThree.map((item, index) => (
              <Card
                key={getCommerceItemKey(item) || index}
                onClick={() => navigate({ to: getCommerceItemRoute(item) })}
                className="cursor-pointer overflow-hidden p-0 text-left transition-shadow hover:shadow-lg"
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate({ to: getCommerceItemRoute(item) });
                  }
                }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={resolveBackendAssetUrl(
                      item?.images?.[0],
                      "https://via.placeholder.com/300x200",
                    )}
                    alt={item?.name || "Item"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <CardContent className="flex flex-col gap-1.5 p-4">
                  <Text weight="semibold" className="line-clamp-1">
                    {item?.name || "Item"}
                  </Text>
                  <Text size="sm" tone="brand" weight="semibold">
                    {formatShopCurrency(item?.price)}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default MoreProduct;
