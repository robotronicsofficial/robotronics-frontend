import PropTypes from "prop-types";
import { useMemo } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import {
  COMMERCE_ITEM_TYPES,
  createCourseCommerceItem,
  createProductCommerceItem,
  getCommerceItemKey,
  getCommerceItemRoute,
} from "@/lib/commerceItems";
import { COURSE_PATH, SHOP_PATH } from "@/router/paths";
import { cn } from "@/lib/utils";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useFormatMoney } from "@/utils/formatPrice";
import { useCourses } from "@/hooks/useCourses";
import { useProducts } from "@/hooks/useProducts";

const RELATED_ITEM_CONFIG = {
  [COMMERCE_ITEM_TYPES.product]: {
    browsePath: SHOP_PATH,
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
      "rounded-xl border border-border bg-card p-10 text-center",
      tone === "error" ? "text-destructive" : "text-foreground",
    )}
  >
    {children}
  </div>
);

RelatedItemsMessage.propTypes = {
  children: PropTypes.node,
  tone: PropTypes.oneOf(["default", "error"]),
};

const MoreProduct = ({ itemType = COMMERCE_ITEM_TYPES.product }) => {
  const navigate = useNavigate();
  const formatMoney = useFormatMoney();
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
  const openItem = (item) => {
    const route = getCommerceItemRoute(item);
    if (route) navigate(route);
  };

  return (
    <section className="bg-background py-20 md:py-24">
      <Container size="wide">
        <div className="flex flex-col gap-10">
          <div
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            data-aos="fade-up"
          >
            <div className="flex max-w-xl flex-col gap-3">
              <Eyebrow>{config.subtitle}</Eyebrow>
              <Heading level={2} className="text-display-md">
                You may also like
              </Heading>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: config.browsePath })}
            >
              {config.browseLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
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
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              data-aos="fade-up"
            >
              {topThree.map((item, index) => (
                <button
                  key={getCommerceItemKey(item) || index}
                  type="button"
                  onClick={() => openItem(item)}
                  className="flex cursor-pointer flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-0 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
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
                  <div className="flex flex-col gap-2 p-5 pt-0">
                    <Text weight="semibold" className="line-clamp-1">
                      {item?.name || "Item"}
                    </Text>
                    <Text size="sm" tone="brand" weight="semibold">
                      {formatMoney(item?.price)}
                    </Text>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

MoreProduct.propTypes = {
  itemType: PropTypes.oneOf(Object.values(COMMERCE_ITEM_TYPES)),
};

export default MoreProduct;
