import PropTypes from "prop-types";
import ShopPages from "../shopPages";

const Decription = ({ description }) => {
  return (
    <div className="bg-background p-2 lg:p-14">
      <div className="flex gap-4 px-2 lg:justify-center lg:gap-10" data-aos="fade-down">
        <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-foreground">
          PRODUCT DETAIL
        </p>
        <p className="h-8 w-0 border border-black "></p>
        <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-foreground">
          DELIVERY AND RETURN
        </p>
      </div>
      <div className="flex justify-between p-5">
        <div className="flex w-1/2 flex-col gap-2 p-2">
          <p className="text-xl poppins-semibold text-foreground lg:text-2xl" data-aos="fade-up">
            DESCRIPTION
          </p>
          <p className="text-wrap text-xs poppins-medium text-muted-foreground ">
            {description}
          </p>
        </div>
        <div className="w-1/2 p-2">
          <div className="flex flex-col gap-2 px-4 text-wrap text-muted-foreground lg:px-20" data-aos="fade-up">
            <p className="text-xl poppins-semibold text-foreground lg:text-2xl">
              FITS AND FEATURES
            </p>
            <p className="text-xs poppins-medium ">
              1. Duis aute irure dolor in reprehenderit in{" "}
            </p>
            <p className="text-xs poppins-medium ">
              2. Duis aute irure dolor in reprehenderit in voluptate{" "}
            </p>
            <p className="text-xs poppins-medium ">
              3. Duis aute irure in reprehenderit in voluptate velit esse{" "}
            </p>
            <p className="text-xs poppins-medium ">
              4. Duis aute irure dolor in reprehenderit in voluptate{" "}
            </p>
            <p className="text-xs poppins-medium ">
              5. Duis aute irure voluptate velit esse{" "}
            </p>
          </div>
        </div>
      </div>

      <ShopPages />
    </div>
  );
};

Decription.propTypes = {
  description: PropTypes.string,
};

export default Decription;
