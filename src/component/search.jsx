import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resolveBackendAssetUrl } from "../utils/mediaUrl";

import { useProducts } from "../hooks/useProducts";
const Search = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-background-50 text-white p-4">
      {/* Search Bar and Filters */}
      <div className="rounded-2xl bg-white p-6 text-foreground shadow-sm">
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
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-border-300 px-4 py-3 text-foreground outline-none focus:border-foreground"
            aria-label="Search products"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-border-300 px-4 py-3 text-foreground outline-none focus:border-foreground"
            aria-label="Select a category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === "All categories" ? "" : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="my-6">
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-foreground shadow-sm">
            Loading live products...
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white p-10 text-center text-red-600 shadow-sm">
            We couldn&apos;t load products right now.
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-foreground shadow-sm">
            No products matched your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <button
                key={product._id}
                type="button"
                onClick={() => navigate(`/ProductDetailPage/${product._id}`)}
                className="overflow-hidden rounded-2xl bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={resolveBackendAssetUrl(product?.images?.[0], "https://via.placeholder.com/300x200")}
                  alt={product?.name || "Product"}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="space-y-3 p-5 text-foreground">
                  <div className="flex items-start justify-between gap-3">
                    <p className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {product?.category || "General"}
                    </p>
                    <p className="text-sm font-semibold">PKR {Number(product?.price || 0).toLocaleString()}</p>
                  </div>
                  <h3 className="text-lg font-bold leading-snug">{product?.name || "Product"}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {product?.description || "Live product listing from the store catalog."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Stock: {product?.stock ?? "N/A"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-2 pb-4 text-foreground">
        <p>{filteredProducts.length} results</p>
        <button
          type="button"
          className="text-foreground hover:underline"
          onClick={() => navigate("/shop")}
        >
          Browse all products &rarr;
        </button>
      </div>
    </div>
  );
};

export default Search;
