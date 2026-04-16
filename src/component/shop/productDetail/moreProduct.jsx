import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resolveBackendAssetUrl } from "../../../utils/mediaUrl";

const MoreProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getProducts`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const payload = await response.json();
        const liveProducts = Array.isArray(payload?.products) ? payload.products : [];
        setProducts(liveProducts.filter((product) => product?._id !== id));
        setError("");
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load related products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [id]);

  const topThree = useMemo(() => products.slice(0, 3), [products]);

  return (
    <div className="bg-gray p-14 ">
      <div className="space-y-8">
        {/* Title */}
        <p
          className="lg:text-5xl text-2xl poppins-bold text-brown text-center"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          You May Also Like This
        </p>

        {/* Description */}
        <p
          className="text-line text-wrap poppins-light text-center"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          Top Selling Products
        </p>

        {/* Product Cards */}
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-brown shadow-sm">
            Loading related products...
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white p-10 text-center text-red-600 shadow-sm">
            {error}
          </div>
        ) : topThree.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-brown shadow-sm">
            No other products are available right now.
            <div className="mt-4">
              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="rounded-lg bg-brown px-5 py-3 font-semibold text-gold"
              >
                Browse the store
              </button>
            </div>
          </div>
        ) : (
          <div
            className="grid gap-6 lg:grid-cols-3"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="4000"
          >
            {topThree.map((product, index) => (
              <button
                key={product._id || index}
                type="button"
                onClick={() => navigate(`/ProductDetailPage/${product._id}`)}
                className="overflow-hidden rounded-2xl bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={resolveBackendAssetUrl(product?.images?.[0], "https://via.placeholder.com/300x200")}
                  alt={product?.name || "Product"}
                  className="h-64 w-full object-cover"
                />
                <div className="space-y-3 p-5 text-brown">
                  <div className="flex items-start justify-between gap-3">
                    <p className="rounded-full bg-[#F3F0EA] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#9E7A3A]">
                      {product?.category || "General"}
                    </p>
                    <p className="text-sm font-semibold">PKR {Number(product?.price || 0).toLocaleString()}</p>
                  </div>
                  <h3 className="text-lg font-bold leading-snug">{product?.name || "Product"}</h3>
                  <p className="line-clamp-2 text-sm text-[#7E7F7C]">
                    {product?.description || "Live product listing from the store catalog."}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreProduct;
