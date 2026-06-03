import PropTypes from "prop-types";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import RangeSlider from "@/components/forms/RangeSlider";
import { Button } from "@/components/ui/button";
import { Eyebrow, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useFormatMoney } from "@/utils/formatPrice";

const shippingMarks = [7, 15, 30, 45, 60].map((value) => ({
  value,
  label: String(value),
}));

const FilterSection = ({ title, isOpen, onToggle, children }) => (
  <div className="flex flex-col gap-4 border-b border-border pb-6 last:border-b-0 last:pb-0">
    <div className="flex items-center justify-between">
      <Eyebrow as="h3">{title}</Eyebrow>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onToggle}
        aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
      >
        {isOpen ? (
          <Minus className="size-4" aria-hidden="true" />
        ) : (
          <Plus className="size-4" aria-hidden="true" />
        )}
      </Button>
    </div>
    {isOpen && children}
  </div>
);

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const Shopfilter = ({
  categories,
  onPriceRangeChange,
  onShippingChange,
  onCategoryChange,
}) => {
  const formatMoney = useFormatMoney();
  const [isOpenProducts, setIsOpenProducts] = useState(true);
  const [isOpenShipping, setIsOpenShipping] = useState(true);
  const [isOpenPrice, setIsOpenPrice] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 600000]);
  const [shippingDays, setShippingDays] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleRangeChange = (value) => {
    setPriceRange(value);
    onPriceRangeChange(value);
  };

  const handleShippingChange = (value) => {
    setShippingDays(value);
    onShippingChange(value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <aside className="hidden min-w-64 flex-col gap-8 lg:flex">
      <FilterSection
        title="All products"
        isOpen={isOpenProducts}
        onToggle={() => setIsOpenProducts(!isOpenProducts)}
      >
        <div className="flex flex-col gap-1">
          {categories.length ? (
            categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={cn(
                  "rounded-lg px-3 py-2 text-left text-body-sm transition-colors",
                  selectedCategory === category
                    ? "bg-primary-soft font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {category}
              </button>
            ))
          ) : (
            <Text size="sm" tone="muted">No product categories yet.</Text>
          )}
        </div>
      </FilterSection>

      <FilterSection
        title="Shipping"
        isOpen={isOpenShipping}
        onToggle={() => setIsOpenShipping(!isOpenShipping)}
      >
        <RangeSlider
          min={7}
          max={60}
          step={1}
          marks={shippingMarks}
          value={shippingDays}
          onChange={handleShippingChange}
          snapValues={shippingMarks.map((mark) => mark.value)}
        />
        <div className="rounded-lg bg-muted p-3 text-center">
          <Text size="sm" weight="semibold">{shippingDays} days</Text>
        </div>
      </FilterSection>

      <FilterSection
        title="Price"
        isOpen={isOpenPrice}
        onToggle={() => setIsOpenPrice(!isOpenPrice)}
      >
        <RangeSlider
          min={0}
          max={600000}
          step={1000}
          value={priceRange}
          onChange={handleRangeChange}
        />
        <div className="rounded-lg bg-muted p-3 text-center">
          <Text size="sm" weight="semibold">
            {formatMoney(priceRange[0])} - {formatMoney(priceRange[1])}
          </Text>
        </div>
      </FilterSection>
    </aside>
  );
};

Shopfilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPriceRangeChange: PropTypes.func.isRequired,
  onShippingChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default Shopfilter;
