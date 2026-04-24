import PropTypes from "prop-types";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowRight, FaRegHeart } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { fetchProducts, addToCart } from "../../store/cart/cartSlice";
import {
  createProductCommerceItem,
  getCommerceItemKey,
} from "../../lib/commerceItems";
import { fetchSavedItems, toggleSavedItem } from "../../lib/savedItems";
import Shopfilter from "../shop/shopfilter";
import Shopproduct from "../shop/shopproduct";
import ShopPages from "../shop/shopPages";
import shopHome from "../../assets/shopHome.png";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import { cn } from "../../lib/utils";

const HeaderSummaryItem = ({ icon, label }) => (
  <div className="flex w-full items-center justify-between gap-4">
    <div className="flex items-center">
      <div className="rounded-full bg-[#352E2C] p-2">
        {icon}
      </div>
      <p className="px-3 text-center text-sm poppins-bold lg:text-base">{label}</p>
    </div>
    <FaArrowRight className="shrink-0 text-[#838383]" />
  </div>
);

HeaderSummaryItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

const Shopsearch = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedItemKeys, setSavedItemKeys] = useState(() => new Set());
  const [priceRange, setPriceRange] = useState([0, 600000]);
  const [shippingDays, setShippingDays] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("Popularity");

  const productsPerPage = 9;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let cancelled = false;

    const loadSavedItems = async () => {
      try {
        const savedItems = await fetchSavedItems();
        if (cancelled) {
          return;
        }

        setSavedItemKeys(new Set(savedItems.map(getCommerceItemKey)));
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load saved items:", error);
        }
      }
    };

    loadSavedItems();

    return () => {
      cancelled = true;
    };
  }, []);

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
      const nextIsSaved = await toggleSavedItem({
        itemType: catalogItem.itemType,
        itemId: catalogItem.itemId,
        isSaved,
      });

      setSavedItemKeys((currentKeys) => {
        const nextKeys = new Set(currentKeys);

        if (nextIsSaved) {
          nextKeys.add(itemKey);
        } else {
          nextKeys.delete(itemKey);
        }

        return nextKeys;
      });
    } catch (error) {
      console.error("Failed to update saved items:", error);
    }
  };

  return (
    <div className="flex flex-col bg-lightgray lg:px-20 px-2">
      <div className="justify-around mb-8">
        <div className="lg:pt-16 pt-8" data-aos="fade-up">
          <div className="h-0 w-full border border-[#838383]"></div>
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
              icon={<FaRegHeart className="text-white" />}
              label={`Wish List (${savedItemKeys.size})`}
            />
            <HeaderSummaryItem
              icon={<BsHandbag className="text-white" />}
              label={`${totalQuantity} Products - PKR ${Number(totalPrice || 0).toLocaleString()}`}
            />
          </div>
        </div>
        <div className="lg:pt-5 pt-5" data-aos="fade-up">
          <div className="h-0 w-full border border-[#838383]"></div>
        </div>
      </div>

      <div className="items-center gap-x-6 lg:flex">
        <div className="lg:text-2xl poppins-regular lg:w-1/5 self-center">
          CATEGORY
          <div className="h-1.5 w-14 border bg-brown border-brown mt-4"></div>
        </div>

        <div className="flex items-center border border-gray bg-white px-2 rounded-md h-12 w-[55vw]">
          <IoIosSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            className="w-full px-2 py-2 outline-none bg-transparent"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative h-12 w-64">
          <select
            className="border bg-white h-full w-full px-2 rounded-md outline-none"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Popularity">Popularity</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex">
        <Shopfilter
          onPriceRangeChange={setPriceRange}
          onShippingChange={setShippingDays}
          onCategoryChange={setSelectedCategory}
        />
        <div className="flex flex-wrap justify-between gap-x-20 gap-y-4 px-5 lg:px-10 lg:py-10 min-h-[85vw]">
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
                    dispatch(addToCart(catalogItem));
                  }
                }}
                productId={product._id}
              />
            );
          })}
          {currentProducts.length === 0 && <p className="text-center w-full">No products found.</p>}
        </div>
      </div>

      <ShopPages />
      <div className="justify-between lg:flex lg:p-5">
        <div className="flex">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              type="button"
              key={i}
              className={cn("p-2 px-4", currentPage === i + 1 ? "bg-gold" : "bg-white")}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p>SHOWING {Math.min(currentPage * productsPerPage, filteredProducts.length)} OF {filteredProducts.length} PRODUCTS</p>
      </div>
    </div>
  );
};

export default Shopsearch;
