import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../store/cart/cartSlice";
import { createProductCommerceItem } from "../../../lib/commerceItems";
import { fetchSavedItems, toggleSavedItem } from "../../../lib/savedItems";

import robo from "../../../assets/images/shopRobot.svg";
import star from "../../../assets/images/shopStar.svg";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { BACKEND_BASE_URL } from "../../../lib/api";
const Intro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(() => products.find((item) => item._id === id) || null);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(robo);
  const [isSaved, setIsSaved] = useState(false);

  const resolveImageUrl = (image) => {
    if (!image) return robo;
    if (image.startsWith("http")) return image;
    return `${BACKEND_BASE_URL}/${image.replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    const cachedProduct = products.find((item) => item._id === id);
    if (cachedProduct) {
      setProduct(cachedProduct);
      setError("");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_BASE_URL}/getProductById/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled) {
          setProduct(data);
          setError("");
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [products, id]);

  useEffect(() => {
    if (product?.images?.[0]) {
      setSelectedImage(resolveImageUrl(product.images[0]));
    } else {
      setSelectedImage(robo);
    }
  }, [product]);

  useEffect(() => {
    if (!id) {
      setIsSaved(false);
      return;
    }

    let cancelled = false;

    const loadSavedState = async () => {
      try {
        const savedItems = await fetchSavedItems();
        if (!cancelled) {
          setIsSaved(
            savedItems.some((item) => item.itemType === "product" && item.itemId === id),
          );
        }
      } catch (savedItemsError) {
        if (!cancelled) {
          console.error("Failed to load saved items:", savedItemsError);
        }
      }
    };

    loadSavedState();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleToggleSavedItem = async () => {
    if (!product?._id) {
      return;
    }

    try {
      const nextIsSaved = await toggleSavedItem({
        itemType: "product",
        itemId: product._id,
        isSaved,
      });

      setIsSaved(nextIsSaved);
    } catch (savedItemsError) {
      console.error("Failed to update saved items:", savedItemsError);
    }
  };

  if (loading) return <p className="p-10 text-center text-lg">Loading product...</p>;
  if (error) return <p className="p-10 text-center text-lg text-red-500">{error}</p>;
  if (!product) return <p className="p-10 text-center text-lg">Product not found.</p>;

  return (
    <div className="bg-lightgray">
      <div className="lg:p-5 lg:px-14 flex flex-row">
        {/* Left Section: Images */}
        <div className="lg:flex flex-row justify-center hidden" data-aos="fade-up">
          <div className="p-14 h-94 w-94 rounded-full bg-gray">
            <img src={selectedImage} alt="Selected" />
          </div>
          <div className="flex flex-row space-x-3 py-10">
            {(product.images || []).map((img, idx) => (
              <div
                key={idx}
                className="h-10 w-10 bg-white shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(resolveImageUrl(img))}
              >
                <img src={resolveImageUrl(img)} alt={`thumb-${idx}`} className="h-10 w-10" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="p-5 lg:px-24 lg:space-y-14 space-y-8" data-aos="fade-up">
          <p className="poppins-bold lg:text-4xl text-wrap">{product.name}</p>

          <div className="space-y-6">
            <div className="flex flex-row items-center lg:space-x-14 space-x-8">
              <div className="flex my-6 text-2xl">
                {Array.from({ length: 5 }, (_, i) => {
                  const ratings = Number(product.ratings || 0);
                  const fullStars = Math.floor(ratings);
                  const hasHalfStar = ratings % 1 >= 0.5;

                  if (i < fullStars) {
                    return <span key={i} className="text-yellow">★</span>;
                  } else if (i === fullStars && hasHalfStar) {
                    return <span key={i} className="text-yellow">☆</span>;
                  } else {
                    return <span key={i} className="text-white">★</span>;
                  }
                })}
              </div>
              {product.onSale && (
                <div className="bg-red-600 p-1 px-2">
                  <span className="text-white">ON SALE</span>
                </div>
              )}
            </div>
            <div className="flex flex-row space-x-2">
              <p className="text-sm poppins-medium text-line">
                {product.productSold ?? 0} products sold,
              </p>
              <p className="text-sm poppins-medium text-line">
                {product.productWatched ?? 0} products watched
              </p>
            </div>
          </div>
          <div className="flex flex-row lg:justify-start space-x-2">
            <div className="lg:px-5 bg-white">
              <p>{product.category}</p>
            </div>

            <div className="bg-white flex items-center">
              <button className="lg:px-3 px-1 lg:py-1 bg-gray-200 rounded-md" onClick={handleDecrease}>-</button>
              <input type="number" className="lg:w-24 w-10 text-center" value={quantity} readOnly />
              <button className="px-3 py-1 bg-gray-200 rounded-md" onClick={handleIncrease}>+</button>
            </div>
          </div>

          <div className="lg:flex flex-row items-center justify-between lg:space-x-10">
            <div className="text-yellow text-2xl poppins-medium">
              PKR {Number(product.price || 0).toLocaleString()}
            </div>
            <div className="flex flex-row space-x-5">
              <button
                className="bg-yellow p-2 lg:px-7 text-white poppins-medium rounded-lg"
                onClick={() => {
                  const cartItem = createProductCommerceItem({
                    ...product,
                    quantity,
                  });

                  if (cartItem) {
                    dispatch(addToCart(cartItem));
                  }
                }}
              >
                ADD TO CART
              </button>
            </div>
            <button
              type="button"
              className="bg-gray p-2 px-3 poppins-medium rounded-lg"
              onClick={handleToggleSavedItem}
              aria-label={isSaved ? "Remove from saved items" : "Save item"}
            >
              {isSaved ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:p-14 p-2 bg-gray">
        <div className="px-2 flex flex-row lg:justify-center lg:space-x-10 space-x-4 " data-aos="fade-down" data-aos-duration="2000" data-aos-delay="4000">
          <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-brown">
            PRODUCT DETAIL
          </p>
          <p className="h-8 w-0 border border-black "></p>
          <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-brown">
            DELIVERY AND RETURN
          </p>
        </div>

        <div className="p-5 flex flex-row justify-between">
          <div className="p-2 w-1/2 space-y-2">
            <p
              className="lg:text-2xl text-xl poppins-semibold text-brown"
              data-aos="fade-up"
            >
              DESCRIPTION
            </p>
            <p className="text-wrap text-xs poppins-medium text-line" data-aos="fade-up">
              {product?.description || "No description available."}
            </p>
          </div>

          <div className="p-2 w-1/2">
            <div
              className="text-wrap text-line space-y-2 lg:px-20 px-4"
              data-aos="fade-up"
            >
              <p className="lg:text-2xl text-xl poppins-semibold text-brown">
                FITS AND FEATURES
              </p>
              {Array.isArray(product?.features) && product.features.length > 0 ? (
                product.features.map((feature, index) => (
                  <p key={index} className="text-xs poppins-medium">
                    {index + 1}. {feature}
                  </p>
                ))
              ) : (
                <p className="text-xs poppins-medium">No features listed.</p>
              )}
            </div>
          </div>
        </div>

        <section className="shopPages flex flex-row items-center gap-8 px-5 lg:px-14" id="shopPages">
          <div className="flex-1 py-8 lg:py-20">
            <div className="flex flex-col justify-content">
              <p
                className="flex text-gold lg:text-4xl text-2xl font-bold"
                data-aos="fade-right"
                data-aos-duration="2000"
                data-aos-delay="4000"
              >
                Keep exploring
              </p>
              <p
                className="flex text-white lg:text-4xl text-2xl font-bold"
                data-aos="fade-left"
                data-aos-duration="2000"
                data-aos-delay="4000"
              >
                Live catalog
              </p>
              <p
                className="mt-4 max-w-xl text-white/80 lg:text-lg text-sm"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="4000"
              >
                Browse the live store inventory instead of a filler promo block.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="rounded-lg bg-gold px-5 py-3 font-semibold text-brown transition hover:opacity-90"
              >
                Browse all products
              </button>
            </div>
            <img src={star} className="mt-6" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000" alt="" />
          </div>
          <div className="flex-1" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">
            <div className="flex justify-content w-full">
              <img src={robo} alt="Product spotlight illustration" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Intro;
