import { Heart } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { getProductDetailRoute } from "@/lib/commerceItems";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useFormatMoney } from "@/utils/formatPrice";

const Shopproduct = ({
  title,
  price,
  image,
  onAddToWishlist,
  onAddToCart,
  productId,
  isSaved = false,
}) => {
  const navigate = useNavigate();
  const formatMoney = useFormatMoney();
  const handleProductClick = () => {
    const route = getProductDetailRoute(productId);
    if (route) navigate(route);
  };

  return (
    <div className="group relative flex w-full max-w-72 flex-col gap-3">
      <Button
        type="button"
        variant="ghost"
        onClick={handleProductClick}
        className="h-auto flex-col items-stretch p-0 text-left hover:bg-transparent"
      >
        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-muted">
          <img
            className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-50"
            src={resolveBackendAssetUrl(image, "https://via.placeholder.com/300x200")}
            alt={title || "Product"}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex flex-col gap-1 pt-2">
          <Text size="lg" weight="semibold">{title}</Text>
          <Text size="lg" tone="brand">{formatMoney(price)}</Text>
        </div>
      </Button>

      <div className="absolute left-1/2 top-[40%] flex w-11/12 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          Add to cart
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onAddToWishlist();
          }}
        >
          <Heart className="size-4" fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
          {isSaved ? "Saved" : "Add to wishlist"}
        </Button>
      </div>
    </div>
  );
};

export default Shopproduct;
