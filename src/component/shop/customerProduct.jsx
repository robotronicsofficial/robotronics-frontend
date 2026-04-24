import PropTypes from "prop-types";
import AppImage from "../AppImage";
import img from "../../assets/images/customerProduct.webp";
import { MdModeEdit,MdDelete  } from "react-icons/md";

const CustomerProduct = ({ title, item, price, image, onDelete, onEdit }) => {
  return (
    <div className="flex flex-row space-x-3">
      <div>
        <AppImage
          className="lg:h-20 lg:w-24 object-cover"
          src={image || img}
          alt={title}
        />
      </div>
      <div className="lg:text-base text-wrap text-sm flex flex-col gap-1">
        <p className="font-bold">{title}</p>
        <div className="flex gap-2">
        <span>Quantity:</span>
        <p className="text-line"> {item}</p>
        </div>

        <div className="flex items-center gap-3">
        <p className="font-bold">Pkr {price}</p>
        {onEdit ? <MdModeEdit className="cursor-pointer" onClick={onEdit} /> : null}
        {onDelete ? <MdDelete className="text-red-600 cursor-pointer" onClick={onDelete} /> : null}
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
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default CustomerProduct;
