import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

import Shopfilter from "../shop/shopfilter";
import Shopproduct from "../shop/shopproduct";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/forms/FormControls";
import { cn } from "@/lib/utils";
import {
  createProductCommerceItem,
  getCommerceItemKey,
} from "@/lib/commerceItems";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useFormatMoney } from "@/utils/formatPrice";
import { useCartStore } from "@/stores/cartStore";
import { useProducts } from "@/hooks/useProducts";
import { useSavedItems, useToggleSavedItemMutation } from "@/hooks/useSavedItems";

const DEFAULT_PRICE_RANGE = [0, 600000];
const DEFAULT_SHIPPING_DAYS = 15;

const ActiveFilterChip = ({ label, onClear, ariaLabel }) => (
  <Badge variant="secondary" className="rounded-full pr-1">
    <span>{label}</span>
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className="ml-1 size-5 p-0 text-muted-foreground hover:text-destructive"
      onClick={onClear}
      aria-label={ariaLabel}
    >
      <X className="size-3" aria-hidden="true" />
    </Button>
  </Badge>
);

const Shopsearch = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const formatMoney = useFormatMoney();
  const { data: products = [] } = useProducts();
  const { data: savedItems = [] } = useSavedItems();
  const toggleSavedItemMutation = useToggleSavedItemMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [shippingDays, setShippingDays] = useState(DEFAULT_SHIPPING_DAYS);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("Popularity");

  const isPriceRangeActive =
    priceRange[0] !== DEFAULT_PRICE_RANGE[0] ||
    priceRange[1] !== DEFAULT_PRICE_RANGE[1];
  const isShippingActive = shippingDays !== DEFAULT_SHIPPING_DAYS;
  const hasActiveFilters =
    Boolean(searchQuery) ||
    Boolean(selectedCategory) ||
    isPriceRangeActive ||
    isShippingActive;

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange(DEFAULT_PRICE_RANGE);
    setShippingDays(DEFAULT_SHIPPING_DAYS);
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  const productsPerPage = 9;

  const savedItemKeys = useMemo(
    () => new Set(savedItems.map(getCommerceItemKey)),
    [savedItems],
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter(({ name, price, shippingDays: days, category }) =>
        String(name || "").toLowerCase().includes(searchQuery.toLowerCase()) &&
        Number(price || 0) >= priceRange[0] &&
        Number(price || 0) <= priceRange[1] &&
        Number(days || 0) <= shippingDays &&
        (!selectedCategory || category === selectedCategory),
      )
      .sort((a, b) => {
        if (sortOption === "Popularity")
          return Number(b.ratings || 0) - Number(a.ratings || 0);
        if (sortOption === "Price: Low to High")
          return Number(a.price || 0) - Number(b.price || 0);
        if (sortOption === "Price: High to Low")
          return Number(b.price || 0) - Number(a.price || 0);
        return 0;
      });
  }, [
    products,
    searchQuery,
    priceRange,
    shippingDays,
    sortOption,
    selectedCategory,
  ]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleToggleSavedItem = async (product) => {
    const catalogItem = createProductCommerceItem(product);
    if (!catalogItem) return;

    const itemKey = getCommerceItemKey(catalogItem);
    const isSaved = savedItemKeys.has(itemKey);

    try {
      await toggleSavedItemMutation.mutateAsync({
        itemType: catalogItem.itemType,
        itemId: catalogItem.itemId,
        isSaved,
      });
    } catch (error) {
      console.error("Failed to update saved items:", error);
    }
  };

  return (
    <section className="bg-background py-12">
      <Container size="wide" className="flex flex-col gap-8">
        <div className="flex flex-col gap-3" data-aos="fade-up">
          <Eyebrow>Catalog</Eyebrow>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4">
              <Search
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              <Input
                type="search"
                className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-64">
              <FormSelect
                name="sortOption"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                options={[
                  { value: "Popularity", label: "Popularity" },
                  { value: "Price: Low to High", label: "Price: Low to High" },
                  { value: "Price: High to Low", label: "Price: High to Low" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Shopfilter
            onPriceRangeChange={setPriceRange}
            onShippingChange={setShippingDays}
            onCategoryChange={setSelectedCategory}
          />

          <div className="flex flex-col gap-6">
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {searchQuery && (
                  <ActiveFilterChip
                    label={`Search: ${searchQuery}`}
                    onClear={() => setSearchQuery("")}
                    ariaLabel="Clear search query"
                  />
                )}
                {selectedCategory && (
                  <ActiveFilterChip
                    label={`Category: ${selectedCategory}`}
                    onClear={() => setSelectedCategory(null)}
                    ariaLabel="Clear category filter"
                  />
                )}
                {isPriceRangeActive && (
                  <ActiveFilterChip
                    label={`${formatMoney(priceRange[0])} - ${formatMoney(priceRange[1])}`}
                    onClear={() => setPriceRange(DEFAULT_PRICE_RANGE)}
                    ariaLabel="Clear price range filter"
                  />
                )}
                {isShippingActive && (
                  <ActiveFilterChip
                    label={`Ships in ${shippingDays} days`}
                    onClear={() => setShippingDays(DEFAULT_SHIPPING_DAYS)}
                    ariaLabel="Clear shipping days filter"
                  />
                )}
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={resetFilters}
                  className="h-auto p-0"
                >
                  Clear all
                </Button>
              </div>
            )}

            {currentProducts.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <Text tone="muted">No products found.</Text>
                {hasActiveFilters && (
                  <Button type="button" variant="outline" onClick={resetFilters}>
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6">
                {currentProducts.map((product) => {
                  const catalogItem = createProductCommerceItem(product);
                  const itemKey = catalogItem ? getCommerceItemKey(catalogItem) : "";
                  return (
                    <Shopproduct
                      key={product._id}
                      title={product.name}
                      price={product.price}
                      image={resolveBackendAssetUrl(
                        product?.images?.[0],
                        "https://via.placeholder.com/300x200",
                      )}
                      isSaved={itemKey ? savedItemKeys.has(itemKey) : false}
                      onAddToWishlist={() => handleToggleSavedItem(product)}
                      onAddToCart={() => {
                        if (catalogItem) addToCart(catalogItem);
                      }}
                      productId={product._id}
                    />
                  );
                })}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      type="button"
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "min-w-9",
                        currentPage === i + 1 && "pointer-events-none",
                      )}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Text size="sm" tone="muted">
                  Showing {Math.min(currentPage * productsPerPage, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
                </Text>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Shopsearch;
