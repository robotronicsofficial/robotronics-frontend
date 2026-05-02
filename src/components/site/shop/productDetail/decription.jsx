import PropTypes from "prop-types";
import ShopPages from "../shopPages";

const Decription = ({ description, features }) => {
  const featureList = Array.isArray(features) ? features.filter(Boolean) : [];
  const hasFeatures = featureList.length > 0;

  return (
    <div className="bg-background p-2 lg:p-14">
      <div className="flex gap-4 px-2 lg:justify-center lg:gap-10" data-aos="fade-down">
        <p className="lg:text-3xl font-bold text-wrap text-foreground">
          PRODUCT DETAIL
        </p>
        <p className="h-8 w-0 border border-foreground"></p>
        <p className="lg:text-3xl font-bold text-wrap text-foreground">
          DELIVERY AND RETURN
        </p>
      </div>
      <div className="flex justify-between p-5">
        <div className="flex w-1/2 flex-col gap-2 p-2">
          <p className="text-xl text-foreground lg:text-2xl" data-aos="fade-up">
            DESCRIPTION
          </p>
          <p className="text-wrap text-xs text-muted-foreground">
            {description}
          </p>
        </div>
        {hasFeatures && (
          <div className="w-1/2 p-2">
            <div className="flex flex-col gap-2 px-4 text-wrap text-muted-foreground lg:px-20" data-aos="fade-up">
              <p className="text-xl text-foreground lg:text-2xl">
                FITS AND FEATURES
              </p>
              {featureList.map((feature, index) => (
                <p key={`${index}-${feature}`} className="text-xs">
                  {index + 1}. {feature}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <ShopPages />
    </div>
  );
};

Decription.propTypes = {
  description: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
};

export default Decription;
