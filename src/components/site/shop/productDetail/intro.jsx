import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { createProductCommerceItem } from "@/lib/commerceItems";

import AppImage from "../../AppImage";
import CenteredState from "@/components/layout/CenteredState";
import robo from "@/assets/images/shopRobot.webp";
import star from "@/assets/images/shopStar.svg";
import { Heart } from "lucide-react";

import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { useSavedItems, useToggleSavedItemMutation } from "@/hooks/useSavedItems";
import StarRating from "@/components/rating/StarRating";
import { formatShopCurrency } from "@/lib/shopCheckout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    if (!product?._id) {
      return;
    }

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
      <CenteredState className="bg-muted p-10 text-center text-lg">
        Loading product...
      </CenteredState>
    );
  }

  if (productError) {
    return (
      <CenteredState className="bg-muted p-10 text-center text-lg text-destructive">
        {productError.message || "We couldn't load this product right now."}
      </CenteredState>
    );
  }

  if (!product) {
    return (
      <CenteredState className="bg-muted p-10 text-center text-lg">
        Product not found.
      </CenteredState>
    );
  }

  const productRating = Number(product.ratings || 0);
  const hasRating = productRating > 0;

  return (
    <div className="bg-muted">
      <div className="flex flex-col lg:flex-row lg:px-14 lg:py-5">
        <div
          className="flex flex-col items-center gap-4 p-4 lg:flex-row lg:justify-center lg:p-0"
          data-aos="fade-up"
        >
          <div className="h-64 w-64 rounded-full bg-background p-10 lg:h-94 lg:w-94 lg:p-14">
            <AppImage src={selectedImage} alt="Selected" loading="eager" />
          </div>
          <div className="flex gap-2 overflow-x-auto py-2 lg:flex-col lg:gap-3 lg:py-10">
            {(product.images || []).map((img, idx) => (
              <Button
                key={`${img}-${idx}`}
                type="button"
                variant="secondary"
                size="icon"
                className="size-10 shrink-0 rounded-none border border-border bg-card p-0"
                onClick={() => setSelectedImage(resolveImageUrl(img))}
              >
                <AppImage
                  src={resolveImageUrl(img)}
                  alt={`thumb-${idx}`}
                  className="size-10"
                />
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 p-5 lg:gap-14 lg:px-24" data-aos="fade-up">
          <p className="poppins-bold lg:text-4xl text-wrap">{product.name}</p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-8 lg:gap-14">
              {hasRating ? (
                <StarRating value={productRating} className="my-6 text-2xl" />
              ) : (
                <p className="my-6 text-sm text-muted-foreground poppins-medium">
                  No ratings yet
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <p className="text-sm poppins-medium text-muted-foreground">
                {product.productSold ?? 0} products sold,
              </p>
              <p className="text-sm poppins-medium text-muted-foreground">
                {product.productWatched ?? 0} products watched
              </p>
            </div>
          </div>
          <div className="flex gap-2 lg:justify-start">
            <div className="bg-card lg:px-5">
              <p>{product.category}</p>
            </div>

            <div className="flex items-center bg-card">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-md bg-muted px-1 lg:px-3 lg:py-1"
                onClick={handleDecrease}
              >
                -
              </Button>
              <Input type="number" className="h-auto w-10 text-center lg:w-24" value={quantity} readOnly />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-md bg-muted px-3 py-1"
                onClick={handleIncrease}
              >
                +
              </Button>
            </div>
          </div>

          <div className="items-center justify-between lg:flex lg:gap-10">
            <div className="text-primary text-2xl poppins-medium">
              {formatShopCurrency(product.price)}
            </div>
            <div className="flex gap-5">
              <Button
                type="button"
                className="h-auto rounded-lg bg-primary p-2 text-background lg:px-7"
                onClick={() => {
                  const cartItem = createProductCommerceItem({
                    ...product,
                    quantity,
                  });

                  if (cartItem) {
                    addToCart(cartItem);
                  }
                }}
              >
                ADD TO CART
              </Button>
            </div>
            <Button
              type="button"
              variant="secondary"
              className="h-auto rounded-lg bg-background p-2 px-3"
              onClick={handleToggleSavedItem}
              aria-label={isSaved ? "Remove from saved items" : "Save item"}
            >
              {isSaved ? <Heart  fill="currentColor" /> : <Heart  />}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-background p-2 lg:p-14">
        <div className="flex gap-4 px-2 lg:justify-center lg:gap-10" data-aos="fade-down">
          <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-foreground">
            PRODUCT DETAIL
          </p>
          <p className="h-8 w-0 border border-foreground"></p>
          <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-foreground">
            DELIVERY AND RETURN
          </p>
        </div>

        <div className="flex justify-between p-5">
          <div className="flex w-1/2 flex-col gap-2 p-2">
            <p
              className="lg:text-2xl text-xl poppins-semibold text-foreground"
              data-aos="fade-up"
            >
              DESCRIPTION
            </p>
            <p className="text-wrap text-xs poppins-medium text-muted-foreground" data-aos="fade-up">
              {product?.description || "No description available."}
            </p>
          </div>

          <div className="w-1/2 p-2">
            <div
              className="flex flex-col gap-2 px-4 text-wrap text-muted-foreground lg:px-20"
              data-aos="fade-up"
            >
              <p className="lg:text-2xl text-xl poppins-semibold text-foreground">
                FITS AND FEATURES
              </p>
              {Array.isArray(product?.features) && product.features.length > 0 ? (
                product.features.map((feature, index) => (
                  <p key={index} className="text-xs poppins-medium">
                    {index + 1}. {feature}
                  </p>
                ))
              ) : (
                <p className="text-xs poppins-medium">No features listed.</p>
              )}
            </div>
          </div>
        </div>

        <section className="shopPages flex items-center gap-8 px-5 lg:px-14" id="shopPages">
          <div className="flex-1 py-8 lg:py-20">
            <div className="flex flex-col justify-content">
              <p
                className="flex text-primary lg:text-4xl text-2xl font-bold"
                data-aos="fade-right"
              >
                Keep exploring
              </p>
              <p
                className="flex text-background lg:text-4xl text-2xl font-bold"
                data-aos="fade-left"
              >
                Live catalog
              </p>
              <p
                className="mt-4 max-w-xl text-background/80 lg:text-lg text-sm"
                data-aos="fade-up"
              >
                Browse the live store inventory instead of a filler promo block.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button
                type="button"
                onClick={() => navigate({ to: "/shop" })}
                className="h-auto rounded-lg bg-primary px-5 py-3 font-semibold text-foreground hover:opacity-90"
              >
                Browse all products
              </Button>
            </div>
            <img src={star} className="mt-6" data-aos="fade-up" alt="" />
          </div>
          <div className="flex-1" data-aos="fade-left">
            <div className="flex w-full justify-content">
              <AppImage src={robo} alt="Product spotlight illustration" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Intro;
