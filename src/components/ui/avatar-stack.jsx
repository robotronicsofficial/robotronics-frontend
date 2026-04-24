import PropTypes from "prop-types";
import AppImage from "../../component/AppImage";
import { cn } from "@/lib/utils";

const AvatarStack = ({ images, size = "md", className, imageClassName, alt = "" }) => {
  const sizeClass =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";

  return (
    <div className={cn("flex flex-row gap-x-3", className)}>
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={cn(
            "overflow-hidden rounded-full border border-border bg-transparent",
            sizeClass,
          )}
        >
          <AppImage
            src={src}
            alt={alt}
            className={cn("h-full w-full object-cover", imageClassName)}
          />
        </div>
      ))}
    </div>
  );
};

AvatarStack.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  alt: PropTypes.string,
};

export default AvatarStack;
