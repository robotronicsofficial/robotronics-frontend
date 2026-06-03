import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormInput, FormSelect } from "@/components/forms/FormControls";
import { useProducts } from "@/hooks/useProducts";
import { resolveCatalogImageUrl } from "@/lib/catalogImage";
import { getProductDetailRoute } from "@/lib/commerceItems";
import { useFormatMoney } from "@/utils/formatPrice";
import { SHOP_PATH } from "@/router/paths";

const Search = () => {
  const navigate = useNavigate();
  const formatMoney = useFormatMoney();
  const {
    data: products = [],
    isLoading: loading,
    error,
  } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const categories = useMemo(() => {
    const values = products
      .map((product) => product?.category)
      .filter(Boolean);

    return ["All categories", ...new Set(values)];
  }, [products]);
  const categoryOptions = categories.map((cat) => ({
    label: cat,
    value: cat === "All categories" ? "all" : cat,
  }));

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const name = String(product?.name || "").toLowerCase();
      const description = String(product?.description || "").toLowerCase();
      const productCategory = String(product?.category || "").toLowerCase();
      const matchesQuery =
        !query || name.includes(query) || description.includes(query) || productCategory.includes(query);
      const matchesCategory = !category || category === "all categories" || productCategory === category.toLowerCase();

      return matchesQuery && matchesCategory;
    });
  }, [products, searchTerm, category]);

  const openProduct = (productId) => {
    const route = getProductDetailRoute(productId);
    if (route) navigate(route);
  };

  return (
    <div className="min-h-screen bg-muted text-background p-4">
      {/* Search Bar and Filters */}
      <Card className="rounded-2xl py-0">
        <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Live catalog</p>
            <h1 className="text-3xl font-bold">Search products</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Search the live store inventory by name, description, or category.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_240px]">
          <FormInput
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            controlClassName="text-foreground"
            aria-label="Search products"
          />
          <FormSelect
            name="category"
            value={category || "all"}
            onChange={(e) => setCategory(e.target.value === "all" ? "" : e.target.value)}
            options={categoryOptions}
            aria-label="Select a category"
          />
        </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="my-6">
        {loading ? (
          <div className="rounded-2xl border border-border p-10 text-center text-foreground">
            Loading live products...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-border p-10 text-center text-destructive">
            We couldn&apos;t load products right now.
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-border p-10 text-center text-foreground">
            No products matched your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Button
                key={product._id}
                type="button"
                variant="ghost"
                onClick={() => openProduct(product._id)}
                className="h-auto flex-col items-stretch overflow-hidden rounded-2xl bg-card border border-border p-0 text-left transition hover:-translate-y-1"
              >
                <img
                  src={resolveCatalogImageUrl(product?.images?.[0])}
                  alt={product?.name || "Product"}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex flex-col gap-y-3 p-5 text-foreground">
                  <div className="flex items-start justify-between gap-3">
                    <p className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {product?.category || "General"}
                    </p>
                    <p className="text-sm font-semibold">{formatMoney(product?.price)}</p>
                  </div>
                  <h3 className="text-lg font-bold leading-snug">{product?.name || "Product"}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {product?.description || "Live product listing from the store catalog."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Stock: {product?.stock ?? "N/A"}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-2 pb-4 text-foreground">
        <p>{filteredProducts.length} results</p>
        <Button
          type="button"
          variant="link"
          className="text-foreground"
          onClick={() => navigate({ to: SHOP_PATH })}
        >
          Browse all products &rarr;
        </Button>
      </div>
    </div>
  );
};

export default Search;
