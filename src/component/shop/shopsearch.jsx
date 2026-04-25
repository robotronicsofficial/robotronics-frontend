import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { ArrowRight, Heart, Search, ShoppingBag, X } from "lucide-react";
import {
  createProductCommerceItem,
  getCommerceItemKey,
} from "../../lib/commerceItems";
import Shopfilter from "../shop/shopfilter";
import Shopproduct from "../shop/shopproduct";
import ShopPages from "../shop/shopPages";
import shopHome from "../../assets/shopHome.png";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import { cn } from "../../lib/utils";
import { formatShopCurrency } from "../../lib/shopCheckout";
import { useProducts } from "../../hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormSelect } from "../../components/forms/FormControls";
import {
  selectCartTotalPrice,
  selectCartQuantity,
  useCartStore,
} from "../../stores/cartStore";
import { useSavedItems, useToggleSavedItemMutation } from "../../hooks/useSavedItems";

const DEFAULT_PRICE_RANGE = [0, 600000];
const DEFAULT_SHIPPING_DAYS = 15;

const HeaderSummaryItem = ({ icon, label }) => (
  <div className="flex w-full items-center justify-between gap-4">
    <div className="flex items-center">
      <div className="rounded-full bg-foreground p-2">
        {icon}
      </div>
      <p className="px-3 text-center text-sm poppins-bold lg:text-base">{label}</p>
    </div>
    <ArrowRight className="shrink-0 text-muted-foreground" />
  </div>
);

HeaderSummaryItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

const Shopsearch = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const totalQuantity = useCartStore(selectCartQuantity);
  const totalPrice = useCartStore(selectCartTotalPrice);
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
        (!selectedCategory || category === selectedCategory)
      )
      .sort((a, b) => {
        if (sortOption === "Popularity") return Number(b.ratings || 0) - Number(a.ratings || 0);
        if (sortOption === "Price: Low to High") return Number(a.price || 0) - Number(b.price || 0);
        if (sortOption === "Price: High to Low") return Number(b.price || 0) - Number(a.price || 0);
        return 0;
      });
  }, [products, searchQuery, priceRange, shippingDays, sortOption, selectedCategory]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleToggleSavedItem = async (product) => {
    const catalogItem = createProductCommerceItem(product);
    if (!catalogItem) {
      return;
    }

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
    <div className="flex flex-col bg-muted lg:px-20 px-2">
      <div className="justify-around mb-8">
        <div className="lg:pt-16 pt-8" data-aos="fade-up">
          <div className="h-0 w-full border border-muted-foreground"></div>
        </div>
        <div className="items-center justify-between lg:flex lg:px-2 lg:pt-5 md:flex">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img src={shopHome} className="size-[18px]" alt="" data-aos="fade-up" />
              <p className="px-5 font-bold" data-aos="fade-up">Shop Page</p>
            </div>
          </div>

          <div className="flex w-[50%] justify-between gap-10 pr-10" data-aos="fade-up">
            <HeaderSummaryItem
              icon={<Heart className="text-background" />}
              label={`Wish List (${savedItemKeys.size})`}
            />
            <HeaderSummaryItem
              icon={<ShoppingBag className="text-background" />}
              label={`${totalQuantity} Products - ${formatShopCurrency(totalPrice)}`}
            />
          </div>
        </div>
        <div className="lg:pt-5 pt-5" data-aos="fade-up">
          <div className="h-0 w-full border border-muted-foreground"></div>
        </div>
      </div>

      <div className="items-center gap-x-6 lg:flex">
        <div className="lg:text-2xl poppins-regular lg:w-1/5 self-center">
          CATEGORY
          <div className="h-1.5 w-14 border bg-foreground border-foreground mt-4"></div>
        </div>

        <div className="flex h-12 w-full flex-1 items-center rounded-md border border-border bg-card px-2">
          <Search className="text-muted-foreground text-xl" />
          <Input
            type="text"
            className="h-full border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative h-12 w-64">
          <FormSelect
            name="sortOption"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            options={[
              { value: "Popularity", label: "Popularity" },
              { value: "Price: Low to High", label: "Price: Low to High" },
              { value: "Price: High to Low", label: "Price: High to Low" },
            ]}
            controlClassName="h-12 bg-card"
          />
        </div>
      </div>

      <div className="flex">
        <Shopfilter
          onPriceRangeChange={setPriceRange}
          onShippingChange={setShippingDays}
          onCategoryChange={setSelectedCategory}
        />
        <div className="flex flex-1 flex-col gap-4 px-5 lg:px-10 lg:py-10">
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm text-foreground">
                  Search: {searchQuery}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search query"
                  >
                    <X className="size-3" />
                  </Button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm text-foreground">
                  Category: {selectedCategory}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setSelectedCategory(null)}
                    aria-label="Clear category filter"
                  >
                    <X className="size-3" />
                  </Button>
                </span>
              )}
              {isPriceRangeActive && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm text-foreground">
                  {formatShopCurrency(priceRange[0])} – {formatShopCurrency(priceRange[1])}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setPriceRange(DEFAULT_PRICE_RANGE)}
                    aria-label="Clear price range filter"
                  >
                    <X className="size-3" />
                  </Button>
                </span>
              )}
              {isShippingActive && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm text-foreground">
                  Ships in {shippingDays} days
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setShippingDays(DEFAULT_SHIPPING_DAYS)}
                    aria-label="Clear shipping days filter"
                  >
                    <X className="size-3" />
                  </Button>
                </span>
              )}
            </div>
          )}
          <div className="grid min-h-screen grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-x-20 gap-y-4">
            {currentProducts.map((product) => {
              const catalogItem = createProductCommerceItem(product);
              const itemKey = catalogItem ? getCommerceItemKey(catalogItem) : "";

              return (
                <Shopproduct
                  key={product._id}
                  title={product.name}
                  price={product.price}
                  image={resolveBackendAssetUrl(product?.images?.[0], "https://via.placeholder.com/300x200")}
                  isSaved={itemKey ? savedItemKeys.has(itemKey) : false}
                  onAddToWishlist={() => handleToggleSavedItem(product)}
                  onAddToCart={() => {
                    if (catalogItem) {
                      addToCart(catalogItem);
                    }
                  }}
                  productId={product._id}
                />
              );
            })}
            {currentProducts.length === 0 && (
              <div className="col-span-full flex flex-col items-center gap-4 py-16 text-center">
                <p className="text-muted-foreground">No products found.</p>
                {hasActiveFilters && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ShopPages />
      <div className="justify-between lg:flex lg:p-5">
        <div className="flex">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              type="button"
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className={cn("h-auto p-2 px-4", currentPage !== i + 1 && "bg-card")}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <p>SHOWING {Math.min(currentPage * productsPerPage, filteredProducts.length)} OF {filteredProducts.length} PRODUCTS</p>
      </div>
    </div>
  );
};

export default Shopsearch;
