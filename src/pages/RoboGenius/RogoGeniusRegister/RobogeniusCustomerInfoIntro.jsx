import Robogeniuscustomercart from "./Robogeniuscustomercart";
const RobogeniusCustomerInfoIntro = () => {
  return (
    <div className="shopCarthero" id="shopCarthero">
      {/* parent */}
      <div className="flex flex-col">
        <div className=" items-center"data-aos="fade-down" data-aos-duration="2000" data-aos-delay="4000" >
          <p className="text-brown font-bold text-wrap lg:text-4xl text-2xl poppins-bold text-center self-center mt-44 pb-6">
            Robogenius <br /> Registration Process
          </p>
          <p className="text-brown text-sm text-wrap text-center poppins-semibold self-center mt-4 text-light opacity-85 ">
            THIS IS YOUR CART BASED ON WHAT YOU WANTED
          </p>
        </div>
        <div className="self-center"data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          <Robogeniuscustomercart />
        </div>
      </div>
    </div>
  );
};

export default RobogeniusCustomerInfoIntro;
