import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowRight, FaRegHeart } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { fetchProducts, addToCart } from "../../store/cart/cartSlice";
import Shopfilter from "../shop/shopfilter";
import Shopproduct from "../shop/shopproduct";
import ShopPages from "../shop/shopPages";
import shopHome from "../../assets/shopHome.png";

const Shopsearch = () => {
  const dispatch = useDispatch();

  // Get products and cart data from Redux store
  const products = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  // Local state for filters & sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 600000]);
  const [shippingDays, setShippingDays] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("Popularity");

  const productsPerPage = 9;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(({ name, price, shippingDays: days, category }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        price >= priceRange[0] &&
        price <= priceRange[1] &&
        days <= shippingDays &&
        (!selectedCategory || category === selectedCategory)
      )
      .sort((a, b) => {
        if (sortOption === "Popularity") return b.ratings - a.ratings;
        if (sortOption === "Price: Low to High") return a.price - b.price;
        if (sortOption === "Price: High to Low") return b.price - a.price;
        return 0;
      });
  }, [products, searchQuery, priceRange, shippingDays, sortOption, selectedCategory]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="flex flex-col bg-lightgray lg:px-20 px-2">
      {/* Header Section */}
      <div className="justify-around mb-8">
        <div className="lg:pt-16 pt-8" data-aos="fade-up">
          <div className="h-0 w-full border border-[#838383]"></div>
        </div>
        <div className="lg:flex md:flex lg:px-2 lg:pt-5 justify-between items-center">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img src={shopHome} className="w-[18px] h-[18px]" data-aos="fade-up" />
              <p className="px-5 font-bold" data-aos="fade-up">Shop Page</p>
            </div>
          </div>

          <div className="w-[50%] flex justify-between space-x-5 gap-10 pr-10" data-aos="fade-up">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center">
                <div className="rounded-full bg-[#352E2C] px-2 py-2">
                  <FaRegHeart className="text-white" />
                </div>
                <p className="px-3 lg:text-base poppins-bold text-sm text-center">
                  Wish List ({wishlistCount})
                </p>
              </div>
              <FaArrowRight className="text-[#838383]" />
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <div className="rounded-full bg-[#352E2C] px-2 py-2">
                  <BsHandbag className="text-white" />
                </div>
                <p className="px-3 lg:text-base text-sm poppins-bold text-center">
                  {totalQuantity} Products - PKR {totalPrice.toLocaleString()}
                </p>
              </div>
              <FaArrowRight className="text-[#838383]" />
            </div>
          </div>
        </div>
        <div className="lg:pt-5 pt-5" data-aos="fade-up">
          <div className="h-0 w-full border border-[#838383]"></div>
        </div>
      </div>

      {/* Category Section */}
      <div className="lg:flex flex-row items-center gap-x-6">
        <div className="lg:text-2xl poppins-regular lg:w-1/5 self-center">
          CATEGORY
          <div className="h-1.5 w-14 border bg-brown border-brown mt-4"></div>
        </div>

        {/* Search Bar */}
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

        {/* Sorting Dropdown */}
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

      {/* Product Display Section */}
      <div className="flex">
        <Shopfilter
          onPriceRangeChange={setPriceRange}
          onShippingChange={setShippingDays}
          onCategoryChange={setSelectedCategory}
        />
        <div className="flex flex-wrap justify-between gap-x-20 gap-y-4 px-5 lg:px-10 lg:py-10 min-h-[85vw]">
          {currentProducts.map((product) => (
            <Shopproduct
              key={product._id}
              title={product.name}
              price={product.price}
              image={`http://localhost:8080/${product.images[0]}`}
              onAddToWishlist={() => setWishlistCount((prev) => prev + 1)}
              onAddToCart={() => dispatch(addToCart(product))}
              productId={product._id}
            />
          ))}
          {currentProducts.length === 0 && <p className="text-center w-full">No products found.</p>}
        </div>
      </div>

      <ShopPages />
      <div className="lg:flex flex-row justify-between lg:p-5">
        <div className="flex">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`p-2 px-4 ${currentPage === i + 1 ? "bg-gold" : "bg-white"}`}
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
