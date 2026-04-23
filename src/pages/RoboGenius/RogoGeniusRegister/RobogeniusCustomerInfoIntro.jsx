import Robogeniuscustomercart from "./Robogeniuscustomercart";
const RobogeniusCustomerInfoIntro = () => {
  return (
    <div className="shopCarthero" id="shopCarthero">
      {/* parent */}
      <div className="flex flex-col ">
        <div className=" items-center"data-aos="fade-down" >
          <p className="text-[#362D2C] font-poppins font-bold text-wrap lg:text-4xl text-2xl text-center self-center mt-44 pb-6">
            RoboGenius <br /> Registration Process
          </p>
        </div>
        <div className=""data-aos="fade-up">
          <Robogeniuscustomercart />
        </div>
      </div>
    </div>
  );
};

export default RobogeniusCustomerInfoIntro;
