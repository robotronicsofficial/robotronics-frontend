import { useEffect, useState, useMemo } from "react";
import { FaArrowRight, FaRegHeart } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import Shopfilter from "../shop/shopfilter";
import Shopproduct from "../shop/shopproduct";
import ShopPages from "../shop/shopPages";
import icon from "../../assets/logo/searchicon.svg";
import shopHome from "../../assets/shopHome.png";

const Shopsearch = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 600000]);
  const [shippingDays, setShippingDays] = useState(15);
  const [sortOption, setSortOption] = useState("Popularity");
  const productsPerPage = 9;

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/getProducts");
        const data = await response.json();
        if (isMounted) setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
    return () => (isMounted = false);
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(({ name, price, shippingDays: days }) =>
        name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        price >= priceRange[0] &&
        price <= priceRange[1] &&
        days <= shippingDays
      )
      .sort((a, b) => {
        if (sortOption === "Price: Low to High") return a.price - b.price;
        if (sortOption === "Price: High to Low") return b.price - a.price;
        return 0;
      });
  }, [products, searchQuery, priceRange, shippingDays, sortOption]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const totalCartPrice = useMemo(() => cartItems.reduce((total, { price }) => total + price, 0), [cartItems]);

  return (
    <div className="flex flex-col bg-lightgray lg:px-20 px-2">
      {/* Header Section */}
      <div className="justify-around mb-8">
        {/* Line 1 */}
        <div className="lg:pt-16 pt-8" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000">
          <div className="h-0 w-full border border-[#838383]"></div>
        </div>
        <div className="lg:flex md:flex lg:px-2 lg:pt-5 justify-between items-center">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                src={shopHome}
                className="w-[18px] h-[18px]"
                data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000"
              />
              <p className="px-5 font-bold" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">
                Shop Page
              </p>
            </div>
          </div>

          <div className="w-[50%] flex justify-between space-x-5 gap-10 pr-10" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center">
                <div className="rounded-full bg-[#352E2C] px-2 py-2" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000">
                  <FaRegHeart className="text-white" />
                </div>
                <div>
                  <p className="px-3 lg:text-base poppins-bold text-sm text-center">
                    Wish List ({wishlistCount})
                  </p>
                </div>
              </div>
              <FaArrowRight className="text-[#838383]" />
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <div className="rounded-full bg-[#352E2C] px-2 py-2">
                  <BsHandbag className="text-white" />
                </div>
                <div>
                  <p className="px-3 lg:text-base text-sm poppins-bold text-center">
                    {cartItems.length} Products - PKR {totalCartPrice}
                  </p>
                </div>
              </div>
              <FaArrowRight className="text-[#838383]" />
            </div>
          </div>
        </div>
        {/* Line 2 */}
        <div className="lg:pt-5 pt-5" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">
          <div className="h-0 w-full border border-[#838383]"></div>
        </div>
      </div>

      {/* Category Section */}
      <div className="lg:flex flex-row">
        <div className="lg:text-2xl poppins-regular lg:w-1/5 self-center">
          CATEGORY
          <div className="h-1.5 w-14 border bg-brown border-brown mt-4"></div>
        </div>

        {/* Search and Sort Section */}
        <div className="lg:text-2xl text-xl poppins-regular lg:w-4/5">
          <div className="flex lg:space-x-3">
            <div className="flex flex-1">
              <button className="border border-gray bg-white p-2">
                <img src={icon} alt="" />
              </button>
              <input
                type="text"
                className="border border-gray w-full"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="relative">
            <select
              className="border bg-white h-10 w-64"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Popularity">Popularity</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Display Section */}
      <div className="flex">
        <Shopfilter onPriceRangeChange={setPriceRange} onShippingChange={setShippingDays} />
        <div className="flex flex-wrap justify-between gap-x-20 gap-y-4 px-5 lg:px-10 lg:py-10 min-h-[85vw]">
          {currentProducts.map((product) => (
            <Shopproduct
              key={product.id}
              title={product.name}
              price={product.price}
              image={`http://localhost:8080/${product.images[0]}`}
              onAddToWishlist={() => setWishlistCount((prev) => prev + 1)}
              onAddToCart={() => setCartItems((prev) => [...prev, product])}
              productId={product.id}
            />
          ))}
          {currentProducts.length === 0 && <p className="text-center w-full">No products found.</p>}
        </div>
      </div>


      <ShopPages/>
      {/* Pagination Section */}
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