import { useEffect, useState, useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import { BsHandbag} from "react-icons/bs";
import Shopfilter from "../shop/shopfilter";
import Shopproduct from "../shop/shopproduct";
import ShopPages from "../shop/shopPages";
import icon from "../../assets/logo/searchicon.svg";
import arow from "../../assets/logo/shopArowIcon.svg";
import robot from "../../assets/robo.jpg";
import shopHome from "../../assets/shopHome.png";
import { FaRegHeart } from "react-icons/fa";


// import ShopItems from "../shopItems";
// import { a } from "framer-motion/client";


const Shopsearch = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/getProducts");
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

 // Memoized filtered products
 const filteredProducts = useMemo(() => {
  return products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [products, searchQuery]);
  

   // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = useMemo(() => {
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, indexOfFirstProduct, indexOfLastProduct]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSearchClick = () => {
    console.log("Search button clicked");
  };

  const handleArrowClick = () => {
    console.log("Arrow button clicked");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  return (
    <div className="flex flex-col bg-lightgray lg:px-20 px-2">
      {/* block 1 */}
      <div className="flex-1 ">
        <div className="justify-around">
          {/* line 1 */}
          <div className="lg:pt-16 pt-8" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000">
            <div className="h-0 w-full border border-[#838383]"></div>
          </div>
          <div className="lg:flex md:flex lg:px-2 lg:pt-5  justify-between items-center ">
            <div className="flex justify-between">
              <div className="flex">
                <img 
                  src={shopHome} 
                  alt="" 
                  className="w-[18px] h-[18px]"
                  data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000"
                />

                <p className="px-5 font-bold" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">
                  Main Page
                </p>
                <p className="font-bold opacity-10">
                  Catalog
                </p>
              </div>
            </div>

            <div className="w-[50%] flex justify-between space-x-5 gap-10 pr-10" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">
              <div className="flex justify-between  w-full items-center">
                <div className="flex items-center">
                  <div className="rounded-full bg-[#352E2C] px-2 py-2" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000">
                    <FaRegHeart className="text-white"/>
                  </div>
                  <div>
                    <p className="px-3 lg:text-base poppins-bold text-sm text-center ">
                      Wish List (0)
                    </p>
                  </div>
                </div>
                <FaArrowRight className="text-[#838383]" />
              </div>

              <div className="flex  w-full items-center justify-between">
                <div className="flex items-center ">
                  <div className="rounded-full bg-[#352E2C] px-2 py-2">
                    <BsHandbag className=" text-white" />  
                  </div>
                  <div>
                    <p className="px-3 lg:text-base text-sm poppins-bold text-center">
                      2 Products - $1000
                    </p>
                  </div>
                </div>
                <FaArrowRight className="text-[#838383]" />
              </div>
            </div>
          </div>
          {/* line 2 */}
          <div className=" lg:pt-5 pt-5" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">
            <div className="h-0 w-full border border-[#838383]"></div>
          </div>
        </div>


        {/* search-bars */}
        <div className="lg:flex flex-row " data-aos="fade-down" data-aos-duration="2000" data-aos-delay="4000">
          <div className=" lg:text-2xl poppins-regular lg:w-1/5 self-center">
            CATEGORY
            <div className="h-1.5 w-14 border bg-brown border-brown mt-4"></div>
          </div>
          <div className=" lg:text-2xl text-xl poppins-regular items-right lg:py-10 py-4 lg:w-4/5">
            catalog
            <div className="flex lg:space-x-3">
              {/* search */}
              <div className="flex flex-1">
                <button className="border border-gray bg-white p-2" onClick={handleSearchClick}>
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
              {/* search */}
              <div className="flex ">
                <button className="border border-gray bg-white" onClick={handleArrowClick}>
                  <img className="" src={arow} alt="" />
                </button>
                <input
                  type="text"
                  className="border border-gray lg:h-10 lg:w-64"
                  placeholder="Popular"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* block 2 */}
      <div className="flex-1" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000">
        {/* parent */}
        <div className="flex ">
          <Shopfilter/>
          {/* shop items */}
          <div className="flex flex-wrap items-center justify-between gap-x-20 gap-y-10 p-5 lg:px-10">
            {currentProducts.map((product) => (
              <a
                className="h-[25vw]"
                href="/ProductDetailPage"
                key={product.id}
              >
                <Shopproduct
                  title={product.name}
                  description={product.description}
                  image={robot}
                  price={product.price}
                  category={product.category}
                />
              </a>
            ))}
            {currentProducts.length === 0 && (
              <p className="text-center w-full">No products found.</p>
            )}
          </div>
        </div>
      </div>
      {/* Pagination Section */}
      <div className="flex-1">
        <div className="">
          <ShopPages />
        </div>
        <div className="lg:flex flex-row justify-between lg:p-5">
          {/* Pagination */}
          <div className="flex">
          {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`p-1 px-3 ${
                  currentPage === index + 1 ? "bg-gold" : "bg-white"
                } lg:text-base text-sm hover:bg-gold`}
                onClick={() => handlePageChange(index + 1)}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">
          <p className="lg:text-base text-sm poppins-medium">
              SHOWED {indexOfFirstProduct + 1} -{" "}
              {Math.min(indexOfLastProduct, filteredProducts.length)} OF{" "}
              {filteredProducts.length} PRODUCTS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopsearch;
