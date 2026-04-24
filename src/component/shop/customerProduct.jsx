import PropTypes from "prop-types";
import AppImage from "../AppImage";
import img from "../../assets/images/customerProduct.webp";
import { MdDelete, MdModeEdit } from "react-icons/md";

const CustomerProduct = ({
  title,
  item,
  price,
  image,
  imageClassName = "object-cover lg:h-20 lg:w-24",
  onDelete,
  onEdit,
  priceLabel = "Pkr",
}) => {
  return (
    <div className="flex gap-3">
      <div>
        <AppImage
          className={imageClassName}
          src={image || img}
          alt={title}
        />
      </div>
      <div className="flex flex-col gap-1 text-wrap text-sm lg:text-base">
        <p className="font-bold">{title}</p>
        <div className="flex gap-2">
          <span>Quantity:</span>
          <p className="text-muted-foreground">{item}</p>
        </div>

        <div className="flex items-center gap-3">
          <p className="font-bold">{priceLabel ? `${priceLabel} ` : ""}{price}</p>
          {onEdit ? (
            <button type="button" aria-label="Edit product" className="inline-flex" onClick={onEdit}>
              <MdModeEdit />
            </button>
          ) : null}
          {onDelete ? (
            <button
              type="button"
              aria-label="Delete product"
              className="inline-flex text-destructive"
              onClick={onDelete}
            >
              <MdDelete />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

CustomerProduct.propTypes = {
  title: PropTypes.string,
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  imageClassName: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  priceLabel: PropTypes.string,
};

export default CustomerProduct;
