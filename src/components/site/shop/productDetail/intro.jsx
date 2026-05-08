import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowRight, Heart, Minus, Plus, ShoppingCart } from "lucide-react";

import AppImage from "../../AppImage";
import CenteredState from "@/components/layout/CenteredState";
import HeroAtmospherics from "@/components/marketing/HeroAtmospherics";
import StarRating from "@/components/rating/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Display, Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createProductCommerceItem } from "@/lib/commerceItems";
import { formatShopCurrency } from "@/lib/shopCheckout";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useCartStore } from "@/stores/cartStore";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useSavedItems, useToggleSavedItemMutation } from "@/hooks/useSavedItems";
import robo from "@/assets/images/shopRobot.webp";

const resolveImageUrl = (image) => resolveBackendAssetUrl(image, robo);

const Intro = () => {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const { data: products = [] } = useProducts();
  const cachedProduct = products.find((item) => item._id === id);
  const {
    data: fetchedProduct,
    isLoading,
    error: productError,
  } = useProduct(cachedProduct ? null : id);
  const { data: savedItems = [] } = useSavedItems();
  const toggleSavedItemMutation = useToggleSavedItemMutation();

  const product = cachedProduct || fetchedProduct || null;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(robo);
  const isSaved = useMemo(
    () => savedItems.some((item) => item.itemType === "product" && item.itemId === id),
    [id, savedItems],
  );

  useEffect(() => {
    if (product?.images?.[0]) {
      setSelectedImage(resolveImageUrl(product.images[0]));
    } else {
      setSelectedImage(robo);
    }
  }, [product]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleToggleSavedItem = async () => {
    if (!product?._id) return;
    try {
      await toggleSavedItemMutation.mutateAsync({
        itemType: "product",
        itemId: product._id,
        isSaved,
      });
    } catch (savedItemsError) {
      console.error("Failed to update saved items:", savedItemsError);
    }
  };

  if (isLoading) {
    return (
      <section className="relative isolate overflow-hidden bg-background pt-header pb-16 md:pb-20">
        <CenteredState className="py-16">
          <Text tone="muted">Loading product…</Text>
        </CenteredState>
      </section>
    );
  }

  if (productError) {
    return (
      <section className="relative isolate overflow-hidden bg-background pt-header pb-16 md:pb-20">
        <CenteredState className="py-16">
          <Text className="text-destructive">
            {productError.message || "We couldn't load this product right now."}
          </Text>
        </CenteredState>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="relative isolate overflow-hidden bg-background pt-header pb-16 md:pb-20">
        <CenteredState className="py-16">
          <Text tone="muted">Product not found.</Text>
        </CenteredState>
      </section>
    );
  }

  const productRating = Number(product.ratings || 0);
  const hasRating = productRating > 0;
  const productImages = product.images || [];

  return (
    <section className="relative isolate overflow-hidden bg-background pt-header pb-16 md:pb-20">
      <HeroAtmospherics variant="full" />

      <Container size="wide">
        <div
          className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-5">
            <div className="aspect-square w-full overflow-hidden rounded-3xl border border-border bg-card lg:flex-1">
              <AppImage
                src={selectedImage}
                alt={product.name || "Product"}
                loading="eager"
                className="h-full w-full object-contain p-10"
              />
            </div>
            {productImages.length > 0 && (
              <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-3">
                {productImages.map((img, idx) => {
                  const url = resolveImageUrl(img);
                  const isActive = url === selectedImage;
                  return (
                    <button
                      key={`${img}-${idx}`}
                      type="button"
                      onClick={() => setSelectedImage(url)}
                      aria-label={`View image ${idx + 1}`}
                      className={cn(
                        "size-16 shrink-0 overflow-hidden rounded-xl border bg-card transition-colors",
                        isActive
                          ? "border-primary ring-2 ring-primary/40"
                          : "border-border hover:border-foreground",
                      )}
                    >
                      <AppImage
                        src={url}
                        alt={`thumb-${idx}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Eyebrow>Robotronics shop</Eyebrow>
              <Display size="md" className="text-balance">
                {product.name}
              </Display>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {hasRating ? (
                <StarRating value={productRating} className="text-h5" />
              ) : (
                <Text size="sm" tone="muted">
                  No ratings yet
                </Text>
              )}
              <Text size="sm" tone="muted">
                {product.productSold ?? 0} sold · {product.productWatched ?? 0} viewed
              </Text>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {product.category && (
                <Badge variant="secondary" className="rounded-full">
                  {product.category}
                </Badge>
              )}
              <div className="inline-flex items-center rounded-full border border-border bg-card">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleDecrease}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" aria-hidden="true" />
                </Button>
                <Input
                  type="number"
                  className="h-8 w-12 border-0 bg-transparent text-center"
                  value={quantity}
                  readOnly
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleIncrease}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Display size="md" tone="brand">
                {formatShopCurrency(product.price)}
              </Display>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="marketing"
                  onClick={() => {
                    const cartItem = createProductCommerceItem({
                      ...product,
                      quantity,
                    });
                    if (cartItem) addToCart(cartItem);
                  }}
                >
                  <ShoppingCart className="size-4" aria-hidden="true" />
                  Add to cart
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleToggleSavedItem}
                  aria-label={isSaved ? "Remove from saved items" : "Save item"}
                >
                  <Heart
                    className="size-5"
                    fill={isSaved ? "currentColor" : "none"}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-16 md:grid-cols-2">
          <div
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
            data-aos="fade-up"
          >
            <Eyebrow>Description</Eyebrow>
            <Text tone="muted">
              {product?.description || "No description available."}
            </Text>
          </div>
          <div
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
            data-aos="fade-up"
          >
            <Eyebrow>Fits and features</Eyebrow>
            {Array.isArray(product?.features) && product.features.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <Text size="sm" tone="muted">
                      {index + 1}. {feature}
                    </Text>
                  </li>
                ))}
              </ul>
            ) : (
              <Text size="sm" tone="muted">
                No features listed.
              </Text>
            )}
          </div>
        </div>

        <div
          className="mt-16 flex flex-col gap-8 rounded-3xl border border-border bg-muted/40 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12"
          id="shopPages"
        >
          <div className="flex max-w-xl flex-col gap-3">
            <Eyebrow>Keep exploring</Eyebrow>
            <Heading level={2} className="text-h3" data-aos="fade-right">
              Browse the live catalog
            </Heading>
            <Text tone="muted" data-aos="fade-up">
              Step away from this product to see every kit, robotics module, and
              learning bundle currently in stock.
            </Text>
          </div>
          <div className="flex flex-wrap items-center gap-3" data-aos="fade-left">
            <Button type="button" onClick={() => navigate({ to: "/shop" })}>
              Browse all products
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Intro;
