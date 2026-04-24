import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../store/cart/cartSlice";
import { createProductCommerceItem } from "../../../lib/commerceItems";
import { fetchSavedItems, toggleSavedItem } from "../../../lib/savedItems";

import AppImage from "../../AppImage";
import CenteredState from "../../../components/layout/CenteredState";
import robo from "../../../assets/images/shopRobot.webp";
import star from "../../../assets/images/shopStar.svg";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { fetchBackendJson, getContentLoadErrorMessage } from "../../../lib/api";
import { resolveBackendAssetUrl } from "../../../utils/mediaUrl";

const resolveImageUrl = (image) => resolveBackendAssetUrl(image, robo);

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
        const data = await fetchBackendJson(`/getProductById/${id}`);
        if (!cancelled) {
          setProduct(data);
          setError("");
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(getContentLoadErrorMessage(fetchError, "We couldn't load this product right now."));
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

  if (loading) {
    return (
      <CenteredState className="bg-lightgray p-10 text-center text-lg">
        Loading product...
      </CenteredState>
    );
  }

  if (error) {
    return (
      <CenteredState className="bg-lightgray p-10 text-center text-lg text-red-500">
        {error}
      </CenteredState>
    );
  }

  if (!product) {
    return (
      <CenteredState className="bg-lightgray p-10 text-center text-lg">
        Product not found.
      </CenteredState>
    );
  }

  return (
    <div className="bg-lightgray">
      <div className="flex lg:px-14 lg:py-5">
        <div className="hidden justify-center lg:flex" data-aos="fade-up">
          <div className="h-94 w-94 rounded-full bg-gray p-14">
            <AppImage src={selectedImage} alt="Selected" loading="eager" />
          </div>
          <div className="flex gap-3 py-10">
            {(product.images || []).map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                type="button"
                className="size-10 border-0 bg-white p-0 shadow-lg"
                onClick={() => setSelectedImage(resolveImageUrl(img))}
              >
                <AppImage
                  src={resolveImageUrl(img)}
                  alt={`thumb-${idx}`}
                  className="size-10"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 p-5 lg:gap-14 lg:px-24" data-aos="fade-up">
          <p className="poppins-bold lg:text-4xl text-wrap">{product.name}</p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-8 lg:gap-14">
              <div className="my-6 flex text-2xl">
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
            <div className="flex gap-2">
              <p className="text-sm poppins-medium text-line">
                {product.productSold ?? 0} products sold,
              </p>
              <p className="text-sm poppins-medium text-line">
                {product.productWatched ?? 0} products watched
              </p>
            </div>
          </div>
          <div className="flex gap-2 lg:justify-start">
            <div className="bg-white lg:px-5">
              <p>{product.category}</p>
            </div>

            <div className="flex items-center bg-white">
              <button
                type="button"
                className="rounded-md bg-gray-200 px-1 lg:px-3 lg:py-1"
                onClick={handleDecrease}
              >
                -
              </button>
              <input type="number" className="w-10 text-center lg:w-24" value={quantity} readOnly />
              <button
                type="button"
                className="rounded-md bg-gray-200 px-3 py-1"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>

          <div className="items-center justify-between lg:flex lg:gap-10">
            <div className="text-yellow text-2xl poppins-medium">
              PKR {Number(product.price || 0).toLocaleString()}
            </div>
            <div className="flex gap-5">
              <button
                type="button"
                className="rounded-lg bg-yellow p-2 text-white poppins-medium lg:px-7"
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
              className="rounded-lg bg-gray p-2 px-3 poppins-medium"
              onClick={handleToggleSavedItem}
              aria-label={isSaved ? "Remove from saved items" : "Save item"}
            >
              {isSaved ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray p-2 lg:p-14">
        <div className="flex gap-4 px-2 lg:justify-center lg:gap-10" data-aos="fade-down">
          <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-brown">
            PRODUCT DETAIL
          </p>
          <p className="h-8 w-0 border border-black"></p>
          <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-brown">
            DELIVERY AND RETURN
          </p>
        </div>

        <div className="flex justify-between p-5">
          <div className="flex w-1/2 flex-col gap-2 p-2">
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

          <div className="w-1/2 p-2">
            <div
              className="flex flex-col gap-2 px-4 text-wrap text-line lg:px-20"
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

        <section className="shopPages flex items-center gap-8 px-5 lg:px-14" id="shopPages">
          <div className="flex-1 py-8 lg:py-20">
            <div className="flex flex-col justify-content">
              <p
                className="flex text-gold lg:text-4xl text-2xl font-bold"
                data-aos="fade-right"
              >
                Keep exploring
              </p>
              <p
                className="flex text-white lg:text-4xl text-2xl font-bold"
                data-aos="fade-left"
              >
                Live catalog
              </p>
              <p
                className="mt-4 max-w-xl text-white/80 lg:text-lg text-sm"
                data-aos="fade-up"
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
            <img src={star} className="mt-6" data-aos="fade-up" alt="" />
          </div>
          <div className="flex-1" data-aos="fade-left">
            <div className="flex w-full justify-content">
              <AppImage src={robo} alt="Product spotlight illustration" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Intro;
