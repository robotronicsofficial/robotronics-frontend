import PropTypes from "prop-types";
import { Pencil, Trash2 } from "lucide-react";

import AppImage from "../AppImage";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import img from "@/assets/images/customerProduct.webp";

const CustomerProduct = ({
  title,
  item,
  price,
  image,
  imageClassName = "object-cover lg:h-20 lg:w-24",
  onDelete,
  onEdit,
  priceLabel = "Pkr",
}) => (
  <div className="flex gap-3">
    <AppImage
      className={imageClassName}
      src={image || img}
      alt={title}
    />
    <div className="flex flex-col gap-1">
      <Text size="sm" weight="semibold">{title}</Text>
      <Text size="sm" tone="muted">
        Quantity: <span className="text-foreground">{item}</span>
      </Text>

      <div className="flex items-center gap-3">
        <Text size="sm" weight="semibold">
          {priceLabel ? `${priceLabel} ` : ""}{price}
        </Text>
        {onEdit && (
          <Button
            type="button"
            aria-label="Edit product"
            variant="ghost"
            size="icon-sm"
            onClick={onEdit}
          >
            <Pencil className="size-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            type="button"
            aria-label="Delete product"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>
    </div>
  </div>
);

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
