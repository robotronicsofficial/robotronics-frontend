import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  COMMERCE_ITEM_TYPES,
  createCourseCommerceItem,
  createProductCommerceItem,
  getCommerceItemKey,
  getCommerceItemRoute,
} from "../../../lib/commerceItems";
import { COURSE_PATH } from "../../../router/paths";
import { resolveBackendAssetUrl } from "../../../utils/mediaUrl";

import { fetchBackendJson, getContentLoadErrorMessage } from "../../../lib/api";
const RELATED_ITEM_CONFIG = {
  [COMMERCE_ITEM_TYPES.product]: {
    endpoint: "/getProducts",
    payloadKey: "products",
    browsePath: "/shop",
    browseLabel: "Browse the store",
    emptyLabel: "No other products are available right now.",
    subtitle: "Top Selling Products",
    loadingLabel: "Loading related products...",
    errorLabel: "Failed to load related products",
    createItem: createProductCommerceItem,
  },
  [COMMERCE_ITEM_TYPES.course]: {
    endpoint: "/get-courses",
    payloadKey: "courses",
    browsePath: COURSE_PATH,
    browseLabel: "Browse courses",
    emptyLabel: "No other courses are available right now.",
    subtitle: "Top Selling Courses",
    loadingLabel: "Loading related courses...",
    errorLabel: "Failed to load related courses",
    createItem: createCourseCommerceItem,
  },
};

const MoreProduct = ({ itemType = COMMERCE_ITEM_TYPES.product }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const config = RELATED_ITEM_CONFIG[itemType] || RELATED_ITEM_CONFIG.product;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const payload = await fetchBackendJson(config.endpoint);
        const liveItems = Array.isArray(payload?.[config.payloadKey]) ? payload[config.payloadKey] : [];
        const normalizedItems = liveItems
          .map((entry) => config.createItem(entry))
          .filter(Boolean)
          .filter((entry) => entry.itemId !== id);

        setItems(normalizedItems);
        setError("");
      } catch (fetchError) {
        setError(getContentLoadErrorMessage(fetchError, config.errorLabel));
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [config, id]);

  const topThree = useMemo(() => items.slice(0, 3), [items]);

  return (
    <div className="bg-gray p-14 ">
      <div className="space-y-8">
        {/* Title */}
        <p
          className="lg:text-5xl text-2xl poppins-bold text-brown text-center"
          data-aos="fade-up"


        >
          You May Also Like This
        </p>

        {/* Description */}
        <p
          className="text-line text-wrap poppins-light text-center"
          data-aos="fade-up"


        >
          {config.subtitle}
        </p>

        {/* Product Cards */}
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-brown shadow-sm">
            {config.loadingLabel}
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white p-10 text-center text-red-600 shadow-sm">
            {error}
          </div>
        ) : topThree.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-brown shadow-sm">
            {config.emptyLabel}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => navigate(config.browsePath)}
                className="rounded-lg bg-brown px-5 py-3 font-semibold text-gold"
              >
                {config.browseLabel}
              </button>
            </div>
          </div>
        ) : (
          <div
            className="grid gap-6 lg:grid-cols-3"
            data-aos="fade-up"


          >
            {topThree.map((item, index) => (
              <button
                key={getCommerceItemKey(item) || index}
                type="button"
                onClick={() => navigate(getCommerceItemRoute(item))}
                className="overflow-hidden rounded-2xl bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={resolveBackendAssetUrl(item?.images?.[0], "https://via.placeholder.com/300x200")}
                  alt={item?.name || "Item"}
                  className="h-64 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="space-y-3 p-5 text-brown">
                  <div className="flex items-start justify-between gap-3">
                    <p className="rounded-full bg-[#F3F0EA] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#9E7A3A]">
                      {item?.category || "General"}
                    </p>
                    <p className="text-sm font-semibold">PKR {Number(item?.price || 0).toLocaleString()}</p>
                  </div>
                  <h3 className="text-lg font-bold leading-snug">{item?.name || "Item"}</h3>
                  <p className="line-clamp-2 text-sm text-[#7E7F7C]">
                    {item?.description || "Live catalog listing from Robotronics."}
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
