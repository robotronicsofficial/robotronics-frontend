import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";


const Shopproduct = ({
  title,
  price,
  image,
  onAddToWishlist,
  onAddToCart,
  productId,
  isSaved = false,
}) => {

  const navigate = useNavigate();

  // Function to handle the click and navigate to product detail page
  const handleProductClick = () => {
    navigate(`/ProductDetailPage/${productId}`);
  };


  return (
    <div className="group relative w-full max-w-72">
       {/* Image and Title wrapped in a clickable div that triggers navigation */}
       <Button type="button" variant="ghost" onClick={handleProductClick} className="h-auto w-full flex-col items-stretch p-0 text-left hover:bg-transparent">
        <div className="aspect-square w-full overflow-hidden rounded-2xl">
          <img
            className="h-full w-full object-fit group-hover:opacity-50"
            src={resolveBackendAssetUrl(image, "https://via.placeholder.com/300x200")}
            alt="Product"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="text-wrap w-full">
          <p className="text-foreground hover:text-foreground text-xl poppins-bold my-2">
            {title}
          </p>
          <p className="text-accent poppins-bold text-xl">PKR {Number(price || 0).toLocaleString()}</p>
        </div>
      </Button>

      {/* Add to Cart and Add to Wishlist buttons */}
      <div className="absolute left-1/2 top-1/2 flex w-11/12 -translate-x-1/2 -translate-y-1/2 transform flex-col opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Button
          type="button"
          variant="secondary"
          className="mb-2 h-auto bg-muted/30 p-2 text-foreground poppins-medium"
          onClick={(e) => {
            e.stopPropagation(); // Prevent link navigation
            onAddToCart(); // Trigger add to cart
          }}
        >
          Add to Cart
        </Button>
        <Button
          type="button"
          className="h-auto bg-accent p-2 text-foreground poppins-medium"
          onClick={(e) => {
            e.stopPropagation(); // Prevent link navigation
            onAddToWishlist(); // Trigger add to wishlist
          }}
        >
          {isSaved ? <Heart className="mr-5 ml-3"  fill="currentColor" /> : <Heart className="mr-5 ml-3"  />}
          {isSaved ? "Saved" : "Add to Wishlist"}
        </Button>
      </div>
    </div>
  );
};

export default Shopproduct;
