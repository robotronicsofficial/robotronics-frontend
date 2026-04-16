import React from "react";
import robo from "../../assets/imagesContent/servicedetailbanner/robo.png";

const ServiceBody = ({ service }) => {
  const goodAtItems = Array.isArray(service?.whatWeAreGoodAt) ? service.whatWeAreGoodAt : [];
  const sideImage = service?.sideImage
    ? service.sideImage.startsWith("http")
      ? service.sideImage
      : `${import.meta.env.VITE_BACKEND_URL}/${service.sideImage.replace(/\\/g, "/")}`
    : robo;

  return (
    <>
      <div className=" min-h-[65vw] flex gap-5 p-20">
        <div className="h-[65vw] w-[46vw] flex items-center justify-start">
          <div className="h-[40vw] w-full ">
            <h2 className="text-[#E26400] mb-3 uppercase font-bold text-[1vw]">
              OverView
            </h2>
            <p className="text-wrap text-[1.5vw] leading-8 mb-8 pr-6">
              {service?.overview || "Overview coming soon."}
            </p>
            <h2 className="text-[#E26400] mb-3 capatalize font-bold text-[1.5vw] ">
              What we are good at:
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-gray-800 text-[1.2vw] text-wrap pr-6">
              {goodAtItems.length > 0 ? goodAtItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              )) : <li>No details available yet.</li>}
            </ul>
          </div>
        </div>
        <div className="h-[65vw] w-[46vw] bg-green-500 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover"
            src={sideImage}
            alt="Service Image"
          />
        </div>
      </div>
      <div className="min-h-[50vw]  px-20 py-10">
        <h2 className="text-[3vw] leading-none mb-10">
          What Makes <br />
          Devsinc Your ERP Partner?
        </h2>
        <div className="h-[40vw] w-full ">
          <img className="w-full h-full object-contain" src={robo} alt="" />
          {/* <img className="w-full h-full object-contain" src={robo} alt="" /> */}
        </div>
      </div>
    </>
  );
};

export default ServiceBody;
